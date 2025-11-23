import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { SceneSubject } from './subject.types';
import * as THREE from 'three';

export class Model implements SceneSubject {
	private _scene: THREE.Scene;
	private model: THREE.Group | null = null;
	public _modelPath: string;

	constructor({ scene, modelPath }: { scene: THREE.Scene; modelPath: string }) {
		this._scene = scene;
		this._modelPath = modelPath;

		this.create(this._modelPath);
	}

	// ---- PUBLIC METHODS ----
	create(modelPath: string) {
		this.model = this.buildModel(modelPath);
		this._scene.add(this.model);
	}

	update(): void {
		console.warn('Method not implemented.', this);
	}

	dispose(): void {
		if (this.model) {
			this._scene.remove(this.model);
		}
	}

	// ---- PRIVATE METHODS ----
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
}
