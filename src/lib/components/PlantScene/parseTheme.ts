import type { ConditionStatus } from "$lib/types/condition";
import type { TemperatureRange } from "$lib/types/temperature";
import { hotTheme } from "./themes/hot";
import type { SceneTheme, TemperatureThemeMap } from "./themes/theme";

// Variables
export const modelPathSunflower = '/models/sunflower_soft.glb'; 
export const modelPathSappling = '/models/cactus_vanilla.glb'; 

const temperatureSceneThemes: TemperatureThemeMap = {
  Cold: {
    ...hotTheme
  },
  Pleasant: {
    ...hotTheme
  },
  Hot: {
    ...hotTheme
  },
};

function getSceneTheme(range: TemperatureRange, condition: ConditionStatus): SceneTheme {
  const sceneTheme = temperatureSceneThemes[range][condition];

  if (!sceneTheme) {
    throw new Error(`No scene theme found for ${range} and ${condition}`);
  }
  return sceneTheme;
}

export { getSceneTheme };

// PLEASANT
// modelPath: modelPathSunflower,
// backgroundColor: 0x73D4EF,
// groundColor: 0xC8F3FF,

// COLD
// modelPath: modelPathSappling,
// backgroundColor: 0xb9b5c8,
// groundColor: 0xf7f5fb,