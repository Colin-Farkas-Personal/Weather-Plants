import type { ConditionStatus } from '$lib/globals/conditionStatusStore.svelte';
import type { TemperatureRange } from '$lib/types/temperature';
import type { LightNames, LightSourceAttributes } from '../subjects/general-lights.types';
import type { ModelAttributes, ModelType } from '../subjects/models.types';

type TemperatureThemeMap = Record<TemperatureRange, Partial<ThemeMap>>;
type ThemeMap = Record<ConditionStatus, SceneTheme>;

interface SceneTheme {
	readonly model: Partial<Record<ModelType, ModelAttributes>>;
	cloudModel?: string;
	readonly shadow: ShadowAttributes;
	readonly fog: FogAttributes;
	readonly background: BackgroundAttributes;
	readonly lights: Record<LightNames, LightSourceAttributes>;
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
	HSLColor,
	HexColor,
	RGBColor,
	LightSourceAttributes,
};
