import * as THREE from "three";
import type { SceneSubject } from "./Subject";

interface Constructor {
    scene: THREE.Scene;
    color: THREE.Color;
}

export class GroundPlane implements SceneSubject {

    constructor({ scene, color }: Constructor) {
        scene.add(this.createCirclePlane(color));
    }
    update(): void {
        console.warn("Method not implemented.", this);
    }

    private createCirclePlane(color: THREE.Color): THREE.Mesh {
        const radius = 5;
        const segments = 64;
        const geometry = new THREE.CircleGeometry(radius, segments);

        const material = new THREE.MeshStandardMaterial({ color: color });

        const plane = new THREE.Mesh(geometry, material);
        plane.rotation.x = -Math.PI / 2;
        plane.position.y = -0.28;
        plane.receiveShadow = true;

        return plane;
    }
}