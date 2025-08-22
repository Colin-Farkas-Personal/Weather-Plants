import type { SceneSubject } from "./subject";
import * as THREE from "three";

interface ConstructorParams {
    scene: THREE.Scene;
}

export class Sky implements SceneSubject {
    private skyMesh: THREE.Mesh;

    constructor({ scene }: ConstructorParams) {
        this.skyMesh = this.createSky();
        scene.add(this.skyMesh);
    }

    update(): void {
        console.warn("Method not implemented.", this);
    }

    private createSky(): THREE.Mesh {
        const geometry = new THREE.SphereGeometry(500, 32, 15);
        const material = new THREE.MeshBasicMaterial({
            side: THREE.BackSide
        });
        return new THREE.Mesh(geometry, material);
    }
}