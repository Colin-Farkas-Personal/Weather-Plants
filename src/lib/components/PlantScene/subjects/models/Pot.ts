import * as THREE from 'three';
import type { SceneSubject } from '../subject';
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface ConstructorParams {
    scene: THREE.Scene;
    modelPath: string;
}

export class Pot implements SceneSubject {
    private scene: THREE.Scene;
    private modelPath: string;
    private model: THREE.Group | null = null;

    constructor({ scene, modelPath }: ConstructorParams) {
        this.scene = scene;
        this.modelPath = modelPath;

        if (this.modelPath) {
            this.create(this.modelPath);
        }
    }

    create(modelPath: string): void {
        this.model = this.buildModel(modelPath);
        this.scene.add(this.model);
    }

    update(): void {
        console.warn("Method not implemented.", this);
    }

    dispose(): void {
        if (this.model) {
            this.scene.remove(this.model);
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
                        emissive: child.material.emissive,
                        side: THREE.DoubleSide
                    });
                }
            });
        };
    }
}