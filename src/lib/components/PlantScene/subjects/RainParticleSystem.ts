import * as THREE from 'three';
import type { RainDebugOptions, RainOptions, RainState } from '../themes/theme.types';
import type { RainDrop, RainParticleSystemParams } from './rain.types';

const MAX_POOL_SIZE = 100;

const defaultRainOptions: Required<Omit<RainOptions, 'debug'>> = {
	enabled: true,
	maxActiveDrops: 1000,
	fallSpeed: 0.1,
	dropScale: 8,
	spawnInsetX: 0.15,
	spawnInsetZ: 0.15,
	spawnTopOffset: 0.12,
	despawnY: 0,
	canopyPenetration: 0.08,
};

const defaultDebugOptions: Required<RainDebugOptions> = {
	showCloudBounds: true,
	showSpawnFootprint: false,
	showCanopyBounds: true,
};

export class RainParticleSystem {
	private _scene: THREE.Scene;
	private _state: RainState = 'idle';
	private _options: Required<Omit<RainOptions, 'debug'>> = { ...defaultRainOptions };
	private _debugOptions: Required<RainDebugOptions> = { ...defaultDebugOptions };

	private readonly getCloudBounds: () => THREE.Box3 | undefined;
	private readonly getPlantBounds: () => THREE.Box3 | undefined;

	private readonly drops: RainDrop[];
	private readonly instancedMesh: THREE.InstancedMesh;
	private readonly dummy = new THREE.Object3D();
	private activeDrops = 0;
	private spawnAccumulator = 0;

	private readonly cloudBounds = new THREE.Box3();
	private readonly plantBounds = new THREE.Box3();
	private readonly canopyBounds = new THREE.Box3();
	private readonly spawnBounds = new THREE.Box3();

	private cloudBoundsHelper?: THREE.Box3Helper;
	private canopyBoundsHelper?: THREE.Box3Helper;
	private spawnFootprintHelper?: THREE.Line;

	constructor({ scene, getCloudBounds, getPlantBounds, options }: RainParticleSystemParams) {
		this._scene = scene;
		this.getCloudBounds = getCloudBounds;
		this.getPlantBounds = getPlantBounds;
		this.setOptions(options ?? {});

		const dropGeometry = this.createDropGeometry();
		const dropMaterial = new THREE.MeshStandardMaterial({
			color: new THREE.Color('#9dc8ff'),
			roughness: 0.3,
			metalness: 0,
			transparent: true,
			opacity: 0.9,
		});

		this.instancedMesh = new THREE.InstancedMesh(dropGeometry, dropMaterial, MAX_POOL_SIZE);
		this.instancedMesh.castShadow = false;
		this.instancedMesh.receiveShadow = false;
		this.instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
		this.instancedMesh.frustumCulled = false;
		this._scene.add(this.instancedMesh);

		this.drops = Array.from({ length: MAX_POOL_SIZE }, () => ({
			active: false,
			position: new THREE.Vector3(),
			speed: 0,
			scale: 0,
		}));
		this.hideAllInstances();
	}

	start() {
		if (this._state === 'running') {
			return;
		}
		this._state = 'running';
		this.instancedMesh.visible = true;
	}

	stop() {
		if (this._state === 'idle') {
			return;
		}
		this._state = 'stopping';
	}

	update(delta: number) {
		if (this._state === 'idle') {
			return;
		}

		this.updateDebugHelpers();

		if (this._state === 'running') {
			this.spawnDrops(delta);
		}

		const canopyBounds = this.getCanopyBounds();
		this.updateDrops(delta, canopyBounds);

		if (this._state === 'stopping' && this.activeDrops === 0) {
			this._state = 'idle';
			this.instancedMesh.visible = false;
		}
	}

	setOptions(options: RainOptions) {
		const maxActiveDrops = this.clampInt(
			options.maxActiveDrops ?? this._options.maxActiveDrops,
			1,
			MAX_POOL_SIZE,
		);
		this._options = {
			enabled: options.enabled ?? this._options.enabled,
			maxActiveDrops,
			fallSpeed: Math.max(0.1, options.fallSpeed ?? this._options.fallSpeed),
			dropScale: Math.max(0.01, options.dropScale ?? this._options.dropScale),
			spawnInsetX: Math.max(0, options.spawnInsetX ?? this._options.spawnInsetX),
			spawnInsetZ: Math.max(0, options.spawnInsetZ ?? this._options.spawnInsetZ),
			spawnTopOffset: Math.max(0.01, options.spawnTopOffset ?? this._options.spawnTopOffset),
			despawnY: options.despawnY ?? this._options.despawnY,
			canopyPenetration: Math.max(
				0,
				options.canopyPenetration ?? this._options.canopyPenetration,
			),
		};

		if (this.activeDrops > this._options.maxActiveDrops) {
			this.trimActiveDrops(this._options.maxActiveDrops);
		}

		if (options.debug) {
			this.setDebugOptions(options.debug);
		}
	}

	setDebugOptions(debug: RainDebugOptions) {
		this._debugOptions = {
			showCloudBounds: debug.showCloudBounds ?? this._debugOptions.showCloudBounds,
			showSpawnFootprint: debug.showSpawnFootprint ?? this._debugOptions.showSpawnFootprint,
			showCanopyBounds: debug.showCanopyBounds ?? this._debugOptions.showCanopyBounds,
		};
		this.updateDebugHelpers();
	}

	getState(): RainState {
		return this._state;
	}

	dispose() {
		this.removeDebugHelpers();
		this._scene.remove(this.instancedMesh);
		this.instancedMesh.geometry.dispose();
		const material = this.instancedMesh.material;
		if (Array.isArray(material)) {
			for (const mat of material) {
				mat.dispose();
			}
		} else {
			material.dispose();
		}
	}

	private createDropGeometry(): THREE.LatheGeometry {
		const profile = [
			new THREE.Vector2(0.0, 0.0),
			new THREE.Vector2(0.018, 0.015),
			new THREE.Vector2(0.028, 0.055),
			new THREE.Vector2(0.024, 0.11),
			new THREE.Vector2(0.0, 0.16),
		];

		const geometry = new THREE.LatheGeometry(profile, 12);
		geometry.computeVertexNormals();
		return geometry;
	}

	private spawnDrops(delta: number) {
		const cloudBounds = this.getCloudBounds();
		if (!cloudBounds) {
			return;
		}

		this.calculateSpawnBounds(cloudBounds);
		const availableSlots = this._options.maxActiveDrops - this.activeDrops;
		if (availableSlots <= 0) {
			return;
		}

		const spawnRatePerSecond = Math.max(8, this._options.maxActiveDrops * 2.5);
		this.spawnAccumulator += delta * spawnRatePerSecond;
		let spawnCount = Math.min(availableSlots, Math.floor(this.spawnAccumulator));

		if (spawnCount <= 0 && availableSlots > 0 && this.activeDrops === 0) {
			spawnCount = 1;
		}

		this.spawnAccumulator = Math.max(0, this.spawnAccumulator - spawnCount);

		for (let i = 0; i < spawnCount; i += 1) {
			const slot = this.findInactiveDropIndex();
			if (slot < 0) {
				return;
			}
			this.activateDrop(slot);
		}
	}

	private updateDrops(delta: number, canopyBounds: THREE.Box3 | undefined) {
		for (let i = 0; i < this.drops.length; i += 1) {
			const drop = this.drops[i];
			if (!drop.active) {
				continue;
			}

			drop.position.y -= drop.speed * delta;
			const shouldDespawn = this.shouldDespawn(drop.position, canopyBounds);
			if (shouldDespawn) {
				if (this._state === 'running') {
					this.respawnDrop(i);
				} else {
					this.deactivateDrop(i);
				}
				continue;
			}

			this.writeDropMatrix(i, drop.position, drop.scale);
		}

		this.instancedMesh.instanceMatrix.needsUpdate = true;
	}

	private shouldDespawn(position: THREE.Vector3, canopyBounds: THREE.Box3 | undefined): boolean {
		if (position.y <= this._options.despawnY) {
			return true;
		}

		if (!canopyBounds) {
			return false;
		}

		const insideX = position.x >= canopyBounds.min.x && position.x <= canopyBounds.max.x;
		const insideZ = position.z >= canopyBounds.min.z && position.z <= canopyBounds.max.z;
		if (!insideX || !insideZ) {
			return false;
		}

		return position.y <= canopyBounds.max.y - this._options.canopyPenetration;
	}

	private activateDrop(index: number) {
		const drop = this.drops[index];
		drop.active = true;
		drop.position.copy(this.randomSpawnPosition());
		drop.speed = this._options.fallSpeed * this.randomRange(0.85, 1.2);
		drop.scale = this._options.dropScale * this.randomRange(0.8, 1.25);

		this.activeDrops += 1;
		this.writeDropMatrix(index, drop.position, drop.scale);
	}

	private respawnDrop(index: number) {
		const drop = this.drops[index];
		drop.position.copy(this.randomSpawnPosition());
		drop.speed = this._options.fallSpeed * this.randomRange(0.85, 1.2);
		drop.scale = this._options.dropScale * this.randomRange(0.8, 1.25);
		this.writeDropMatrix(index, drop.position, drop.scale);
	}

	private deactivateDrop(index: number) {
		const drop = this.drops[index];
		if (!drop.active) {
			return;
		}
		drop.active = false;
		this.activeDrops = Math.max(0, this.activeDrops - 1);
		this.hideInstance(index);
	}

	private trimActiveDrops(limit: number) {
		let activeSeen = 0;
		for (let i = 0; i < this.drops.length; i += 1) {
			if (!this.drops[i].active) {
				continue;
			}
			activeSeen += 1;
			if (activeSeen > limit) {
				this.deactivateDrop(i);
			}
		}
		this.instancedMesh.instanceMatrix.needsUpdate = true;
	}

	private randomSpawnPosition(): THREE.Vector3 {
		const min = this.spawnBounds.min;
		const max = this.spawnBounds.max;
		const x = this.randomRange(min.x, max.x);
		const z = this.randomRange(min.z, max.z);
		const y = this.randomRange(min.y, max.y);
		return new THREE.Vector3(x, y, z);
	}

	private calculateSpawnBounds(cloudBounds: THREE.Box3) {
		this.cloudBounds.copy(cloudBounds);
		const width = this.cloudBounds.max.x - this.cloudBounds.min.x;
		const depth = this.cloudBounds.max.z - this.cloudBounds.min.z;
		const height = this.cloudBounds.max.y - this.cloudBounds.min.y;

		const insetX = Math.min(this._options.spawnInsetX, Math.max(0, width * 0.45));
		const insetZ = Math.min(this._options.spawnInsetZ, Math.max(0, depth * 0.45));

		const spawnMinY = Math.max(
			this.cloudBounds.min.y + height * 0.25,
			this.cloudBounds.max.y - this._options.spawnTopOffset - height * 0.2,
		);
		const spawnMaxY = Math.max(
			spawnMinY + 0.01,
			this.cloudBounds.max.y - this._options.spawnTopOffset,
		);

		this.spawnBounds.min.set(
			Math.min(this.cloudBounds.max.x, this.cloudBounds.min.x + insetX),
			spawnMinY,
			Math.min(this.cloudBounds.max.z, this.cloudBounds.min.z + insetZ),
		);
		this.spawnBounds.max.set(
			Math.max(this.cloudBounds.min.x, this.cloudBounds.max.x - insetX),
			spawnMaxY,
			Math.max(this.cloudBounds.min.z, this.cloudBounds.max.z - insetZ),
		);
	}

	private getCanopyBounds(): THREE.Box3 | undefined {
		const bounds = this.getPlantBounds();
		if (!bounds) {
			return undefined;
		}

		this.plantBounds.copy(bounds);
		const canopyStartY =
			this.plantBounds.min.y + (this.plantBounds.max.y - this.plantBounds.min.y) * 0.35;
		this.canopyBounds.min.set(this.plantBounds.min.x, canopyStartY, this.plantBounds.min.z);
		this.canopyBounds.max.set(
			this.plantBounds.max.x,
			this.plantBounds.max.y,
			this.plantBounds.max.z,
		);
		return this.canopyBounds;
	}

	private writeDropMatrix(index: number, position: THREE.Vector3, scale: number) {
		this.dummy.position.copy(position);
		this.dummy.scale.set(scale * 0.8, scale * 1.35, scale * 0.8);
		this.dummy.rotation.set(0, 0, 0);
		this.dummy.updateMatrix();
		this.instancedMesh.setMatrixAt(index, this.dummy.matrix);
	}

	private hideInstance(index: number) {
		this.dummy.position.set(0, -9999, 0);
		this.dummy.scale.set(0.0001, 0.0001, 0.0001);
		this.dummy.updateMatrix();
		this.instancedMesh.setMatrixAt(index, this.dummy.matrix);
	}

	private hideAllInstances() {
		for (let i = 0; i < MAX_POOL_SIZE; i += 1) {
			this.hideInstance(i);
		}
		this.instancedMesh.instanceMatrix.needsUpdate = true;
		this.instancedMesh.visible = false;
	}

	private findInactiveDropIndex(): number {
		for (let i = 0; i < this.drops.length; i += 1) {
			if (!this.drops[i].active) {
				return i;
			}
		}
		return -1;
	}

	private updateDebugHelpers() {
		const cloudBounds = this.getCloudBounds();
		const canopyBounds = this.getCanopyBounds();

		this.updateCloudBoundsHelper(cloudBounds);
		this.updateCanopyBoundsHelper(canopyBounds);
		this.updateSpawnFootprintHelper(cloudBounds);
	}

	private updateCloudBoundsHelper(cloudBounds: THREE.Box3 | undefined) {
		if (!this._debugOptions.showCloudBounds || !cloudBounds) {
			if (this.cloudBoundsHelper) {
				this._scene.remove(this.cloudBoundsHelper);
				this.cloudBoundsHelper = undefined;
			}
			return;
		}

		if (!this.cloudBoundsHelper) {
			this.cloudBoundsHelper = new THREE.Box3Helper(
				new THREE.Box3(),
				new THREE.Color('#5f9dff'),
			);
			this._scene.add(this.cloudBoundsHelper);
		}
		this.cloudBoundsHelper.box.copy(cloudBounds);
	}

	private updateCanopyBoundsHelper(canopyBounds: THREE.Box3 | undefined) {
		if (!this._debugOptions.showCanopyBounds || !canopyBounds) {
			if (this.canopyBoundsHelper) {
				this._scene.remove(this.canopyBoundsHelper);
				this.canopyBoundsHelper = undefined;
			}
			return;
		}

		if (!this.canopyBoundsHelper) {
			this.canopyBoundsHelper = new THREE.Box3Helper(
				new THREE.Box3(),
				new THREE.Color('#68ff7b'),
			);
			this._scene.add(this.canopyBoundsHelper);
		}
		this.canopyBoundsHelper.box.copy(canopyBounds);
	}

	private updateSpawnFootprintHelper(cloudBounds: THREE.Box3 | undefined) {
		if (!this._debugOptions.showSpawnFootprint || !cloudBounds) {
			if (this.spawnFootprintHelper) {
				this._scene.remove(this.spawnFootprintHelper);
				this.spawnFootprintHelper.geometry.dispose();
				(this.spawnFootprintHelper.material as THREE.LineBasicMaterial).dispose();
				this.spawnFootprintHelper = undefined;
			}
			return;
		}

		this.calculateSpawnBounds(cloudBounds);
		const y = this.spawnBounds.min.y;
		const points = [
			new THREE.Vector3(this.spawnBounds.min.x, y, this.spawnBounds.min.z),
			new THREE.Vector3(this.spawnBounds.max.x, y, this.spawnBounds.min.z),
			new THREE.Vector3(this.spawnBounds.max.x, y, this.spawnBounds.max.z),
			new THREE.Vector3(this.spawnBounds.min.x, y, this.spawnBounds.max.z),
			new THREE.Vector3(this.spawnBounds.min.x, y, this.spawnBounds.min.z),
		];

		if (!this.spawnFootprintHelper) {
			const geometry = new THREE.BufferGeometry().setFromPoints(points);
			const material = new THREE.LineBasicMaterial({ color: new THREE.Color('#7fd4ff') });
			this.spawnFootprintHelper = new THREE.Line(geometry, material);
			this._scene.add(this.spawnFootprintHelper);
			return;
		}

		this.spawnFootprintHelper.geometry.dispose();
		this.spawnFootprintHelper.geometry = new THREE.BufferGeometry().setFromPoints(points);
	}

	private removeDebugHelpers() {
		if (this.cloudBoundsHelper) {
			this._scene.remove(this.cloudBoundsHelper);
			this.cloudBoundsHelper = undefined;
		}

		if (this.canopyBoundsHelper) {
			this._scene.remove(this.canopyBoundsHelper);
			this.canopyBoundsHelper = undefined;
		}

		if (this.spawnFootprintHelper) {
			this._scene.remove(this.spawnFootprintHelper);
			this.spawnFootprintHelper.geometry.dispose();
			(this.spawnFootprintHelper.material as THREE.LineBasicMaterial).dispose();
			this.spawnFootprintHelper = undefined;
		}
	}

	private randomRange(min: number, max: number): number {
		if (min >= max) {
			return min;
		}
		return min + Math.random() * (max - min);
	}

	private clampInt(value: number, min: number, max: number): number {
		return Math.round(Math.min(max, Math.max(min, value)));
	}
}
