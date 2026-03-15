import type * as THREE from 'three';
import type { SnowOptions } from '../themes/theme.types';
import type { BoundsProvider } from './rain.types';

export interface SnowParticleSystemParams {
	scene: THREE.Scene;
	getCloudBounds: BoundsProvider;
	getPlantBounds: BoundsProvider;
	options?: SnowOptions;
}

export type SnowFlake = {
	active: boolean;
	position: THREE.Vector3;
	speed: number;
	scale: number;
	driftPhase: number;
	driftAmount: number;
	spin: THREE.Vector3;
	rotation: THREE.Vector3;
	canopyDespawnY: number;
};
