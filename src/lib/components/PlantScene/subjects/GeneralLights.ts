import * as THREE from 'three';
import { toThreeColor } from '../SceneManager/to-three-color';
import type { SceneSubject, UpdateParams } from './subject.types';

export class GeneralLights implements SceneSubject {
	public frontLight: THREE.SpotLight = this.createFrontLight();
	private ambientLight: THREE.AmbientLight = this.createAmbientLight();

	constructor(scene: THREE.Scene) {
		scene.add(this.ambientLight);
		scene.add(this.frontLight);
		// Ensure the spotlight has an explicit target in the scene (affects shadow camera direction)
		scene.add(this.frontLight.target);
		this.frontLight.target.position.set(0, 0, 0);
		this.frontLight.target.updateMatrixWorld();
	}

	update({ lights }: UpdateParams): void {
		if (!lights) {
			return;
		}

		const { ambient, front } = lights;
		const { x, y, z } = front.position ?? { x: 4, y: 2.5, z: 2.5 };

		// Update ambient light
		this.ambientLight.color.set(toThreeColor(ambient.color).color);
		this.ambientLight.intensity = ambient.intensity;

		// Update front light
		this.frontLight.color.set(toThreeColor(front.color).color);
		this.frontLight.intensity = front.intensity;
		this.frontLight.position.set(x, y, z);
		this.frontLight.castShadow = front.castShadow;
	}

	private createAmbientLight(): THREE.AmbientLight {
		const color = 0xffffff;
		const intensity = 1;
		const ambientLight = new THREE.AmbientLight(color, intensity);
		return ambientLight;
	}

	private createFrontLight(): THREE.SpotLight {
		const color = 0xffffff;
		const intensity = 10;

		// Important: SpotLight constructor signature is:
		// (color, intensity, distance, angle, penumbra, decay)
		const distance = 30;
		const angle = Math.PI / 5; // ~36° cone
		const penumbra = 0.6;
		const decay = 2;

		const spotLight = new THREE.SpotLight(color, intensity, distance, angle, penumbra, decay);

		const x = 4;
		const y = 2.5;
		const z = 2.5;
		spotLight.position.set(x, y, z);

		spotLight.castShadow = true;

		// Shadow quality
		spotLight.shadow.mapSize.width = 2048;
		spotLight.shadow.mapSize.height = 2048;

		// Shadow frustum ("box" that contains the shadow camera)
		spotLight.shadow.camera.near = 0.1;
		spotLight.shadow.camera.far = distance;

		// Makes sure the shadow camera FOV matches (or slightly exceeds) the light cone.
		// `angle` is half-angle in radians, camera expects full FOV in degrees.
		spotLight.shadow.camera.fov = THREE.MathUtils.radToDeg(angle * 2);
		spotLight.shadow.camera.updateProjectionMatrix();

		return spotLight;
	}
}
