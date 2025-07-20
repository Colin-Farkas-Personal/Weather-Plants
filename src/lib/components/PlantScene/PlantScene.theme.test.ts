import { describe, it, expect } from 'vitest';
import { getSceneThemeByTemperature, modelPathCactus, modelPathSappling, modelPathSunflower } from './PlantScene.theme';

describe('getSceneThemeByTemperature()', () => {
  it('returns cold theme for temperatures <= 10', () => {
    const theme = getSceneThemeByTemperature(5);

    expect(theme.modelPath).toBe(modelPathSappling);
    expect(theme.backgroundColor).toBe(0xf2d784);
    expect(theme.groundColor).toBe(0xf2d784);
  });

  it('Returns pleasant theme for temperatures > 10 and <= 30', () => {
    const theme = getSceneThemeByTemperature(20);

    expect(theme.modelPath).toBe(modelPathSunflower);
    expect(theme.backgroundColor).toBe(0xf2d784);
    expect(theme.groundColor).toBe(0xf2d784);
  });

  it('Returns hot theme for temperatures > 30', () => {
    const theme = getSceneThemeByTemperature(35);

    expect(theme.modelPath).toBe(modelPathCactus);
    expect(theme.backgroundColor).toBe(0xf2d784);
    expect(theme.groundColor).toBe(0xf2d784);
  });

  it('returns cold theme for exactly 10', () => {
    const theme = getSceneThemeByTemperature(10);

    expect(theme.modelPath).toBe(modelPathSappling);
  });

  it('returns pleasant theme for exactly 30', () => {
    const theme = getSceneThemeByTemperature(30);

    expect(theme.modelPath).toBe(modelPathCactus);
  });
});
