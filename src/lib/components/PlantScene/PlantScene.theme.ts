import type { TemperatureRange } from "$lib/types/temperature";
import { temperatureToRange } from "$lib/utilities/temperature-to-range";

type SceneTheme = {
  modelPath: string;
  backgroundColor: number;
  groundColor: number;
};

// Variables
export const modelPathCactus = '/models/cactus_day.glb'; 
export const modelPathSunflower = '/models/cactus_day.glb'; 
export const modelPathSappling = '/models/cactus_day.glb'; 

const temperatureSceneThemes: Record<TemperatureRange, SceneTheme> = {
  Cold: {
    modelPath: modelPathSappling,
    backgroundColor: 0xf2d784,
    groundColor: 0xf2d784,
  },
  Pleasant: {
    modelPath: modelPathSunflower,
    backgroundColor: 0xf2d784,
    groundColor: 0xf2d784,
  },
  Hot: {
    modelPath: modelPathCactus,
    backgroundColor: 0xf2d784,
    groundColor: 0xf2d784,
  },
};

export const TEMPERATURE_HOT = 30;
export const TEMPERATURE_COLD = 10;
function getSceneThemeByTemperature(tempC: number): SceneTheme {
  const sceneThemeRange = temperatureToRange(tempC);
  return temperatureSceneThemes[sceneThemeRange];
}

export { getSceneThemeByTemperature };
