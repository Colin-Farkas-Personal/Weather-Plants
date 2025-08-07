import type { TemperatureRange } from "$lib/types/temperature";

type SceneTheme = {
  modelPath: string;
  backgroundColor: number;
  groundColor: number;
};

// Variables
export const modelPathCactus = '/models/cactus_day.glb'; 
export const modelPathSunflower = '/models/sunflower_day.glb'; 
export const modelPathSappling = '/models/cactus_day.glb'; 

const temperatureSceneThemes: Record<TemperatureRange, SceneTheme> = {
  Cold: {
    modelPath: modelPathSappling,
    backgroundColor: 0xb9b5c8,
    groundColor: 0xf7f5fb,
  },
  Pleasant: {
    modelPath: modelPathSunflower,
    backgroundColor: 0xbde5f9,
    groundColor: 0xdef2fc,
  },
  Hot: {
    modelPath: modelPathCactus,
    backgroundColor: 0xF0D783,
    groundColor: 0xFFFA9B,
  },
};

function getSceneTheme(range: TemperatureRange): SceneTheme {
  console.warn("range ??? ", range);
  return temperatureSceneThemes[range];
}

export { getSceneTheme };
