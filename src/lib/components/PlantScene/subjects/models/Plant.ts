import * as THREE from 'three';
import { GLTFLoader, type GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import type { SceneSubject } from "../subject";

interface ConstructorParams {
    scene: THREE.Scene;
    modelPath: string;
}

export class Plant implements SceneSubject {
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
                // shadows
                child.receiveShadow = true;
                child.castShadow = true;
                
                if (child instanceof THREE.Mesh) {
                    const m = child.material as THREE.MeshStandardMaterial;

                    // keep the original maps; just make it matte
                    if ('metalness' in m) {
                        m.metalness = 0.0;
                    }

                    if ('roughness' in m) {
                        m.roughness = 1;
                    }

                    if ('envMapIntensity' in m) {
                        m.envMapIntensity = 0.3;
                    }
                }
            });
        };
    }
}