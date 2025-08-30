import type { ConditionStatus } from "$lib/types/condition";
import type { TemperatureRange } from "$lib/types/temperature";
import type { LightNames, LightSourceAttributes } from "../subjects/general-lights.types";
import type { ModelAttributes, ModelType } from "../subjects/models/models.types";

type HexColor = `#${string}`;
type MeshAttributes = {
  color: HexColor;
};

type TemperatureThemeMap = Record<TemperatureRange, Partial<ThemeMap>>;
type ThemeMap = Record<ConditionStatus, SceneTheme>;

type SceneTheme = {
  readonly model: Partial<Record<ModelType, ModelAttributes>>;
  readonly fog: MeshAttributes;
  readonly ground: MeshAttributes;
  readonly lights: Record<LightNames, LightSourceAttributes>;
};

export type { TemperatureThemeMap, ThemeMap, SceneTheme, HexColor, MeshAttributes, LightSourceAttributes };
