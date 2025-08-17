import * as THREE from "three";
import type { SceneSubject } from "./Subject";

interface ConstructorParams {
    scene: THREE.Scene;
    color: THREE.Color;
}

export class Sky implements SceneSubject {
    private skyMesh: THREE.Mesh;

    constructor({ scene, color }: ConstructorParams) {
        this.skyMesh = this.createSky(color);
        scene.add(this.skyMesh);
    }

    update(): void {
        console.warn("Method not implemented.", this);
    }

    private createSky(color: THREE.Color): THREE.Mesh {
        const geometry = new THREE.SphereGeometry(500, 32, 15);
        const material = new THREE.MeshBasicMaterial({
            color: color,
            side: THREE.BackSide
        });
        return new THREE.Mesh(geometry, material);
    }
}