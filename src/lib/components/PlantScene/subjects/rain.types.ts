import type * as THREE from 'three';
import type { RainOptions } from '../themes/theme.types';

export type BoundsProvider = () => THREE.Box3 | undefined;

export interface RainParticleSystemParams {
	scene: THREE.Scene;
	getCloudBounds: BoundsProvider;
	getPlantBounds: BoundsProvider;
	options?: RainOptions;
}

export type RainDrop = {
	active: boolean;
	position: THREE.Vector3;
	speed: number;
	scale: number;
	canopyDespawnY: number;
};
