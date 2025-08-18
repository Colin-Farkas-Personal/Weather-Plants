import { GLTFLoader, type GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import type { SceneSubject } from "./subject";
import * as THREE from "three";

interface ConstructorParams {
    scene: THREE.Scene;
    path: string;
}

export class Model implements SceneSubject {

    constructor ({ scene, path }: ConstructorParams) {
        if (path) {
            scene.add(this.buildModel(path));
        }
    }

    update(): void {
        console.warn("Method not implemented.", this);
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
                }
            });
        };
    }

}