import * as THREE from 'three';
import type { FogAttributes } from '../themes/theme.types';
import type { SceneSubject } from './subject.types';

interface Constructor {
	scene: THREE.Scene;
}

export class Fog implements SceneSubject {
	private fog: THREE.FogExp2;

	constructor({ scene }: Constructor) {
		this.fog = new THREE.FogExp2(new THREE.Color(0xffffff), 0.65);
		scene.fog = this.fog;
	}

	update({ color, density }: FogAttributes): void {
		this.fog.color = new THREE.Color(color);
		this.fog.density = density;
	}
}
