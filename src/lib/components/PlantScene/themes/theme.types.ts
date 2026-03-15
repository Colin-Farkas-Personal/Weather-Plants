import type { ConditionStatus } from '$lib/globals/conditionStatusStore.svelte';
import type { TemperatureRange } from '$lib/types/temperature';
import type { LightNames, LightSourceAttributes } from '../subjects/general-lights.types';
import type { ModelAttributes, ModelType } from '../subjects/models.types';

type TemperatureThemeMap = Record<TemperatureRange, Partial<ThemeMap>>;
type ThemeMap = Record<ConditionStatus, SceneTheme>;

interface SceneTheme {
	readonly model: Partial<Record<ModelType, ModelAttributes>>;
	cloudModel?: string;
	rain?: RainOptions;
	snow?: SnowOptions;
	readonly shadow: ShadowAttributes;
	readonly fog: FogAttributes;
	readonly background: BackgroundAttributes;
	readonly lights: Record<LightNames, LightSourceAttributes>;
}

type RainState = 'idle' | 'running' | 'stopping';
type SnowState = 'idle' | 'running' | 'stopping';

interface RainDebugOptions {
	showCloudBounds?: boolean;
	showSpawnFootprint?: boolean;
	showCanopyBounds?: boolean;
}

interface RainOptions {
	enabled?: boolean;
	maxActiveDrops?: number;
	fallSpeed?: number;
	dropScale?: number;
	spawnInsetX?: number;
	spawnInsetZ?: number;
	spawnTopOffset?: number;
	despawnY?: number;
	canopyPenetration?: number;
	debug?: RainDebugOptions;
}

interface SnowDebugOptions {
	showCloudBounds?: boolean;
	showSpawnFootprint?: boolean;
	showCanopyBounds?: boolean;
}

interface SnowOptions {
	enabled?: boolean;
	maxActiveFlakes?: number;
	fallSpeed?: number;
	flakeScale?: number;
	spawnInsetX?: number;
	spawnInsetZ?: number;
	spawnTopOffset?: number;
	despawnY?: number;
	canopyPenetration?: number;
	driftStrength?: number;
	rotationSpeed?: number;
	debug?: SnowDebugOptions;
}

export type DefaultAttributes = {
	color?: HSLColor;
};
type HSLColor =
	| `hsla(${number}, ${number}%, ${number}%, ${number})`
	| `hsl(${number}, ${number}%, ${number}%)`;
export type BackgroundGradientColor = [HSLColor, HSLColor];

type HexColor = `#${string}`;

type RGBColor = `rgb(${number}, ${number}, ${number})`;

interface BackgroundAttributes {
	color: BackgroundGradientColor;
}

export interface FogAttributes extends DefaultAttributes {
	density: number;
}

export interface ShadowAttributes {
	opacity: number;
}

export type {
	TemperatureThemeMap,
	ThemeMap,
	SceneTheme,
	RainState,
	SnowState,
	RainOptions,
	RainDebugOptions,
	SnowOptions,
	SnowDebugOptions,
	HSLColor,
	HexColor,
	RGBColor,
	LightSourceAttributes,
};
