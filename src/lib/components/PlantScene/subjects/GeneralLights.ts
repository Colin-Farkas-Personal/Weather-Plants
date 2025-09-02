import * as THREE from "three";
import { toThreeColor } from "../SceneManager/to-three-color";
import type { SceneSubject, UpdateParams } from "./subject";

export class GeneralLights implements SceneSubject {
    public frontLight: THREE.SpotLight = this.createFrontLight();
    private ambientLight: THREE.AmbientLight = this.createAmbientLight();

    constructor(scene: THREE.Scene) {
        scene.add(this.ambientLight);
        scene.add(this.frontLight);
    }
    
    update({ lights }: UpdateParams): void {
        if (!lights) {
            return; 
        }

        const { ambient, front } = lights;

        // Update ambient light
        this.ambientLight.color.set(toThreeColor(ambient.color).color);
        this.ambientLight.intensity = ambient.intensity;

        // Update front light
        this.frontLight.color.set(toThreeColor(front.color).color);
        this.frontLight.intensity = front.intensity;
    }

    private createAmbientLight(): THREE.AmbientLight {
        const color = 0xFFFFFF;
        const intensity = 1;
        const ambientLight = new THREE.AmbientLight(color, intensity);
        return ambientLight;
    }

    private createFrontLight(): THREE.SpotLight {
        const color = 0xF3FFA8;
        const intensity = 10;
        const distance = 10;
        const angle = 1; 
        const penumbra = 1.2;
        
        const spotLight = new THREE.SpotLight(0xffffff, color, intensity, distance, angle, penumbra);
        spotLight.position.set(4, 2.5, 2);
        
        spotLight.castShadow = true;
        spotLight.shadow.mapSize.set(1024, 1024);

        return spotLight;
    }
}