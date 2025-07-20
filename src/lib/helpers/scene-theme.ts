type TemperatureRange = 'cold' | 'pleasant' | 'hot';
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
  cold: {
    modelPath: modelPathSappling,
    backgroundColor: 0xf2d784,
    groundColor: 0xf2d784,
  },
  pleasant: {
    modelPath: modelPathSunflower,
    backgroundColor: 0xf2d784,
    groundColor: 0xf2d784,
  },
  hot: {
    modelPath: modelPathCactus,
    backgroundColor: 0xf2d784,
    groundColor: 0xf2d784,
  },
};

function getSceneThemeLabel(tempC: number): 'cold' | 'pleasant' | 'hot' {
  if (tempC <= TEMPERATURE_COLD) return 'cold';
  if (tempC < TEMPERATURE_HOT) return 'pleasant';
  return 'hot';
}

export const TEMPERATURE_HOT = 30;
export const TEMPERATURE_COLD = 10;
function getSceneThemeByTemperature(tempC: number): SceneTheme {
  const sceneThemeIndex = getSceneThemeLabel(tempC);
  return temperatureSceneThemes[sceneThemeIndex];
}

export { getSceneThemeByTemperature };
