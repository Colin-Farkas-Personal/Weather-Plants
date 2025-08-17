import * as THREE from "three";
import type { SceneSubject } from "./Subject";

export class GeneralLights implements SceneSubject {
    private ambientLight: THREE.AmbientLight = new THREE.AmbientLight(0xFFFFFF, 1.25);
    private directionalLight: THREE.DirectionalLight = this.createDirectionalLight();

    constructor(scene: THREE.Scene) {
        scene.add(this.ambientLight);
        scene.add(this.directionalLight);
    }
    update(): void {
        console.warn("Method not implemented.", this);
    }

    private createAmbientLight(): THREE.AmbientLight {
        const color = 0xFFFFFF;
        const intensity = 1.25;
        const ambientLight = new THREE.AmbientLight(color, intensity);
        return ambientLight;
    }

    private createDirectionalLight(): THREE.DirectionalLight {
        const color = 0xF3FFA8;
        const intensity = 1.5;
        const directionalLight = new THREE.DirectionalLight(color, intensity);
        
        directionalLight.position.set(1.6, 0.8, 0.45);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;
        directionalLight.shadow.bias = -0.0001;

        return directionalLight;
    }
}