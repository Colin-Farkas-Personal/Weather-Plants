import * as THREE from 'three';
import type { SceneSubject } from './subject.types';

interface Constructor {
	scene: THREE.Scene;
}

export class Ground implements SceneSubject {
	private circlePlane: THREE.Mesh;

	constructor({ scene }: Constructor) {
		this.circlePlane = this.createCirclePlane();
		scene.add(this.circlePlane);
	}

	update({ opacity }: { opacity: number }): void {
		(this.circlePlane.material as THREE.ShadowMaterial).opacity = opacity;
	}

	private createCirclePlane(): THREE.Mesh {
		const radius = 10;
		const segments = 64;
		const geometry = new THREE.CircleGeometry(radius, segments);

		const defaultOpacity = 0;
		const shadowMaterial = new THREE.ShadowMaterial({ opacity: defaultOpacity });

		const plane = new THREE.Mesh(geometry, shadowMaterial);
		plane.rotation.x = -Math.PI / 2;
		plane.position.y = -0.28;
		plane.receiveShadow = true;

		return plane;
	}
}
