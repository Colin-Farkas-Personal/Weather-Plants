import type { ConditionStatus } from "$lib/types/condition";
import type { TemperatureRange } from "$lib/types/temperature";
import type { LightNames, LightSourceAttributes } from "../subjects/general-lights";

type HexColor = `#${string}`;
type MeshAttributes = {
  color: HexColor;
};

type TemperatureThemeMap = Record<TemperatureRange, Partial<ThemeMap>>;
type ThemeMap = Record<ConditionStatus, SceneTheme>;

type SceneTheme = {
  readonly model: {
    path: string;
  };
  readonly fog: MeshAttributes;
  readonly ground: MeshAttributes;
  readonly lights: Record<LightNames, LightSourceAttributes>;
};

export type { TemperatureThemeMap, ThemeMap, SceneTheme, HexColor, MeshAttributes, LightSourceAttributes };
