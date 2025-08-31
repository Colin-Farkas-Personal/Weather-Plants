import * as THREE from 'three';
import type { SceneSubject } from '../subject';
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface ConstructorParams {
    scene: THREE.Scene;
    light: THREE.DirectionalLight;
    modelPath: string;
}

export class Pot implements SceneSubject {
    private _scene: THREE.Scene;
    private _light: THREE.DirectionalLight;
    private modelPath: string;
    private model: THREE.Group | null = null;

    constructor({ scene, light, modelPath }: ConstructorParams) {
        this._scene = scene;
        this._light = light;
        this.modelPath = modelPath;

        if (this.modelPath) {
            this.create(this.modelPath);
        }
    }

    create(modelPath: string): void {
        this.model = this.buildModel(modelPath);
        this._scene.add(this.model);
        this.fitLightToModel(this._light, this.model)
    }

    update(): void {
        console.warn("Method not implemented.", this);
    }

    dispose(): void {
        if (this.model) {
            this._scene.remove(this.model);
        }
    }

    private buildModel(path: string): THREE.Group {
        const loader = new GLTFLoader();
        const model = new THREE.Group();

        loader.load(
            path,
            function(gltf: GLTF) {
                buildModelOptions(gltf);
                model.add(gltf.scene);
            },
            undefined,
            function(error: unknown) {
                console.error('GLTF load error:', error);
            }
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
        };
    }

    private fitLightToModel(light: THREE.DirectionalLight, model: THREE.Object3D) {
        const bbox = new THREE.Box3().setFromObject(model);
        const size = bbox.getSize(new THREE.Vector3()).length();
        const center = bbox.getCenter(new THREE.Vector3());

        light.target.position.copy(center);
        light.target.updateMatrixWorld();

        const cam = light.shadow.camera as THREE.OrthographicCamera;
        const r = size * 0.45;
        cam.left = -r; 
        cam.right = r; 
        cam.top = r;
        cam.near = 0.2; cam.far = size * 3.0;
        cam.bottom = -r + 300;
        cam.updateProjectionMatrix();
    }
}