import * as THREE from "three";
import type { SceneSubject } from "./subject";

export class GeneralLights implements SceneSubject {
    private ambientLight: THREE.AmbientLight = this.createAmbientLight();
    private directionalLight: THREE.DirectionalLight = this.createDirectionalLight();
    private backLight: THREE.DirectionalLight = this.createBackLight();

    constructor(scene: THREE.Scene) {
        scene.add(this.ambientLight);
        scene.add(this.directionalLight);
        scene.add(this.backLight);
    }
    update(): void {
        console.warn("Method not implemented.", this);
    }

    private createAmbientLight(): THREE.AmbientLight {
        const color = 0xFFFFFF;
        const intensity = 1.35;
        const ambientLight = new THREE.AmbientLight(color, intensity);
        return ambientLight;
    }

    private createDirectionalLight(): THREE.DirectionalLight {
        const color = 0xF3FFA8;
        const intensity = 1;
        const directionalLight = new THREE.DirectionalLight(color, intensity);
        
        directionalLight.position.set(1.6, 0.8, 0.45);
        directionalLight.castShadow = true;
        directionalLight.shadow.bias = -0.0001;
        directionalLight.shadow.normalBias = 0.02;

        return directionalLight;
    }

    private createBackLight(): THREE.DirectionalLight {
        const color = 0xF3FFA8;
        const intensity = 0.5;
        const backLight = new THREE.DirectionalLight(color, intensity);

        backLight.position.set(-1.6, 0.8, -0.45);

        return backLight;
    }
}