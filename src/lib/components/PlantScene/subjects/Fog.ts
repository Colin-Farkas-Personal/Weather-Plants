import * as THREE from 'three';
import { toThreeColor } from '../SceneManager/to-three-color';
import type { FogAttributes, HSLColor } from '../themes/theme.types';
import type { SceneSubject } from './subject.types';

interface Constructor {
	scene: THREE.Scene;
	color: HSLColor;
}

export class Fog implements SceneSubject {
	private fog: THREE.FogExp2;

	constructor({ scene, color }: Constructor) {
		const threeColor = toThreeColor(color);
		this.fog = new THREE.FogExp2(threeColor.color, 0.65);
		scene.fog = this.fog;
	}

	update({ color, density }: FogAttributes): void {
		this.fog.color = new THREE.Color(color);
		this.fog.density = density;
	}
}
