import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { SceneSubject } from './subject.types';
import * as THREE from 'three';

export class Model implements SceneSubject {
	private _scene: THREE.Scene;
	private model: THREE.Group | null = null;
	public _modelPath: string;

	private _opacity: number = 1;
	private _targetOpacity: number = 1;
	private _fadeSpeedMs: number = 180;
	private _fadeStartTime: number = 0;
	private _fadeStartOpacity: number = 1;
	private _onFadeOutComplete: (() => void) | null = null;

	constructor({ scene, modelPath }: { scene: THREE.Scene; modelPath: string }) {
		this._scene = scene;
		this._modelPath = modelPath;

		this.create(this._modelPath);
	}

	// ---- PUBLIC METHODS ----
	create(modelPath: string) {
		this._modelPath = modelPath;
		this.model = this.buildModel(modelPath);
		this._scene.add(this.model);
	}

	update(): void {
		this.rotateModel();
		this.updateFade();
	}

	dispose(): void {
		if (this.model) {
			this._scene.remove(this.model);
		}
	}

	fadeIn() {
		this._opacity = 0;
		this._targetOpacity = 1;
		this._fadeStartOpacity = 0;
		this._fadeStartTime = performance.now();
		this.applyOpacity(0);
	}

	fadeOut(onComplete?: () => void) {
		this._targetOpacity = 0;
		this._fadeStartOpacity = this._opacity;
		this._fadeStartTime = performance.now();
		this._onFadeOutComplete = onComplete ?? null;
	}

	// ---- PRIVATE METHODS ----
	private updateFade() {
		if (this._opacity === this._targetOpacity) return;

		const elapsed = performance.now() - this._fadeStartTime;
		const t = Math.min(elapsed / this._fadeSpeedMs, 1);

		this._opacity = this._fadeStartOpacity + (this._targetOpacity - this._fadeStartOpacity) * t;

		if (t >= 1) {
			this._opacity = this._targetOpacity;
			this.applyOpacity(this._opacity);
			if (this._targetOpacity === 0 && this._onFadeOutComplete) {
				const cb = this._onFadeOutComplete;
				this._onFadeOutComplete = null;
				cb();
			}
			return;
		}

		this.applyOpacity(this._opacity);
	}

	private applyOpacity(opacity: number) {
		if (!this.model) return;
		this.model.traverse((child) => {
			if (child instanceof THREE.Mesh && child.material) {
				const mat = child.material as THREE.MeshStandardMaterial;
				mat.transparent = true;
				mat.opacity = opacity;
			}
		});
	}
	private buildModel(path: string): THREE.Group {
		const loader = new GLTFLoader();
		const model = new THREE.Group();

		loader.load(
			path,
			function (gltf: GLTF) {
				buildModelOptions(gltf);
				model.add(gltf.scene);
			},
			undefined,
			function (error: unknown) {
				console.error('GLTF load error:', error);
			},
		);

		return model;

		function buildModelOptions(gltf: GLTF) {
			// Set the model's options based on the loaded GLTF
			const model = gltf.scene;
			model.traverse((child) => {
				if (child instanceof THREE.Mesh) {
					child.castShadow = true;
					child.receiveShadow = true;
					child.material = new THREE.MeshStandardMaterial({
						color: child.material.color,
					});
				}
			});
		}
	}

	private rotateModel() {
		if (this.model) {
			this.model.rotation.y += 0.0001;
		}
	}
}
