import * as THREE from 'three';
import { GLTFLoader, type GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import type { SceneSubject } from "../subject";

interface ConstructorParams {
    scene: THREE.Scene;
    light: THREE.DirectionalLight;
    modelPath: string;
}

export class Plant implements SceneSubject {
    private _scene: THREE.Scene;
    private _light: THREE.DirectionalLight;
    private modelPath: string;
    private model: THREE.Group | null = null;

    constructor({ scene, light, modelPath }: ConstructorParams) {
        this._scene = scene;
        this._light = light
        this.modelPath = modelPath;

        if (this.modelPath) {
            this.create(this.modelPath);
        }
    }

    create(modelPath: string): void {
        this.model = this.buildModel(modelPath);
        this._scene.add(this.model);
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
                // shadows
                child.castShadow = true;
                // child.receiveShadow = true;
            });
        };
    }
}