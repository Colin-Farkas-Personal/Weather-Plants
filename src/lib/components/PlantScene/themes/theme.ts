import type { ConditionStatus } from "$lib/types/condition";
import type { TemperatureRange } from "$lib/types/temperature";

type TemperatureThemeMap = Record<TemperatureRange, ThemeMap>;
type ThemeMap = Partial<Record<ConditionStatus, SceneTheme>>;
type SceneTheme = {
  readonly modelPath: string;
  readonly skyColor: number;
  readonly fogColor: number;
  readonly groundColor: number;
};

export type { TemperatureThemeMap, ThemeMap, SceneTheme };
