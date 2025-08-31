import * as THREE from "three";
import { toThreeColor } from "../SceneManager/to-three-color";
import type { SceneSubject, UpdateParams } from "./subject";

export class GeneralLights implements SceneSubject {
    public frontLight: THREE.DirectionalLight = this.createFrontLight();
    private ambientLight: THREE.AmbientLight = this.createAmbientLight();
    private backLight: THREE.DirectionalLight = this.createBackLight();

    constructor(scene: THREE.Scene) {
        scene.add(this.ambientLight);
        scene.add(this.frontLight);
        scene.add(this.backLight);
    }
    
    update({ lights }: UpdateParams): void {
        if (!lights) {
            return; 
        }

        const { ambient, front, back } = lights;

        // Update ambient light
        this.ambientLight.color.set(toThreeColor(ambient.color).color);
        this.ambientLight.intensity = ambient.intensity;

        // Update front light
        this.frontLight.color.set(toThreeColor(front.color).color);
        this.frontLight.intensity = front.intensity;

        // Update back light
        this.backLight.color.set(toThreeColor(back.color).color);
        this.backLight.intensity = back.intensity;
    }

    private createAmbientLight(): THREE.AmbientLight {
        const color = 0xFFFFFF;
        const intensity = 1;
        const ambientLight = new THREE.AmbientLight(color, intensity);
        return ambientLight;
    }

    private createFrontLight(): THREE.DirectionalLight {
        const color = 0xF3FFA8;
        const intensity = 1.75;
        const directionalLight = new THREE.DirectionalLight(color, intensity);
        
        directionalLight.position.set(1.6, 0.8, 0.45);
        directionalLight.shadow.mapSize.set(2048, 2048)
        directionalLight.castShadow = true;

        return directionalLight;
    }

    private createBackLight(): THREE.DirectionalLight {
        const color = 0xF3FFA8;
        const intensity = 0.75;
        const backLight = new THREE.DirectionalLight(color, intensity);

        backLight.position.set(-1.6, 0.8, -0.45);

        return backLight;
    }
}