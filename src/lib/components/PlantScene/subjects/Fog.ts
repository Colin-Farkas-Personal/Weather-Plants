import * as THREE from "three";
import type { SceneSubject } from "./subject";

interface ConstructorParams {
    scene: THREE.Scene;
    color: THREE.Color;
}

export class Fog implements SceneSubject {
    private fog: THREE.Fog;

    constructor({ scene, color }: ConstructorParams) {
        this.fog = new THREE.Fog(color, 3, 4.5);
        scene.fog = this.fog;
    }

    update(): void {
        console.warn("Method not implemented.", this);
    }
}