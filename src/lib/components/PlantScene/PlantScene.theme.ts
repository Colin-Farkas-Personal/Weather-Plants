import type { TemperatureRange } from "$lib/types/temperature";

type SceneTheme = {
  modelPath: string;
  backgroundColor: number;
  groundColor: number;
};

// Variables
export const modelPathCactus = '/models/cactus_day.glb'; 
export const modelPathSunflower = '/models/sunflower_soft.glb'; 
export const modelPathSappling = '/models/cactus_vanilla.glb'; 

const temperatureSceneThemes: Record<TemperatureRange, SceneTheme> = {
  Cold: {
    modelPath: modelPathSappling,
    backgroundColor: 0xb9b5c8,
    groundColor: 0xf7f5fb,
  },
  Pleasant: {
    modelPath: modelPathSunflower,
    backgroundColor: 0xA3DFFD,
    groundColor: 0xA3DFFD,
  },
  Hot: {
    modelPath: modelPathCactus,
    backgroundColor: 0xF0D783,
    groundColor: 0xF0D783,
  },
};

function getSceneTheme(range: TemperatureRange): SceneTheme {
  console.warn("range ??? ", range);
  return temperatureSceneThemes[range];
}

export { getSceneTheme };
