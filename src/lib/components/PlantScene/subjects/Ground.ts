import * as THREE from 'three';
import type { SceneSubject } from './subject';
import type { HexColor } from '../themes/theme.types';
import { toThreeColor } from '../SceneManager/to-three-color';

interface Constructor {
	scene: THREE.Scene;
	color: HexColor;
}

export class Ground implements SceneSubject {
	private circlePlane: THREE.Mesh;

	constructor({ scene, color }: Constructor) {
		const { color: threeColor } = toThreeColor(color);
		this.circlePlane = this.createCirclePlane(threeColor);
		scene.add(this.circlePlane);
	}

	update({ color }: { color: HexColor }): void {
		(this.circlePlane.material as THREE.MeshStandardMaterial).color = toThreeColor(color).color;
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
