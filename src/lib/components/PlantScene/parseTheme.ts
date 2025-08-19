import type { ConditionStatus } from "$lib/types/condition";
import type { TemperatureRange } from "$lib/types/temperature";
import { pleasantTheme } from "./themes/cold";
import { defaultTheme } from "./themes/default";
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
    ...pleasantTheme
  },
  Hot: {
    ...hotTheme
  },
};

function getSceneTheme(range: TemperatureRange | null, condition: ConditionStatus | null): SceneTheme {
  if (!range || !condition) {
    return defaultTheme;
  }

  return temperatureSceneThemes[range][condition] ?? defaultTheme;
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