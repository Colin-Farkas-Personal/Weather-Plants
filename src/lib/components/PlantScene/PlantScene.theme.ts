import type { TemperatureRange } from "$lib/types/temperature";
import { temperatureToRange } from "$lib/utilities/temperature-to-range";

type SceneTheme = {
  modelPath: string;
  backgroundColor: number;
  groundColor: number;
};

// Variables
export const modelPathCactus = '/models/cactus_day.glb'; 
export const modelPathSunflower = '/models/sunflower_day-test2.glb'; 
export const modelPathSappling = '/models/cactus_day.glb'; 

const temperatureSceneThemes: Record<TemperatureRange, SceneTheme> = {
  Cold: {
    modelPath: modelPathSappling,
    backgroundColor: 0xb9b5c8,
    groundColor: 0xf7f5fb,
  },
  Pleasant: {
    modelPath: modelPathSunflower,
    backgroundColor: 0xB0D8F0,
    groundColor: 0x95C593,
  },
  Hot: {
    modelPath: modelPathCactus,
    backgroundColor: 0xF5D081,
    groundColor: 0xFFFA9B,
  },
};

export const TEMPERATURE_HOT = 30;
export const TEMPERATURE_COLD = 10;
function getSceneThemeByTemperature(tempC: number): SceneTheme {
  const sceneThemeRange = temperatureToRange(tempC);
  return temperatureSceneThemes[sceneThemeRange];
}

export { getSceneThemeByTemperature };
