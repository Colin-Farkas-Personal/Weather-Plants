import type { ThemeMap } from "./theme";

export const modelPathCactus = '/models/cactus_day.glb'; 

// If you only want to specify a subset of ThemeMap keys, you can use Partial<ThemeMap>:
const hotTheme: ThemeMap = {
    SUNNY: {
        modelPath: modelPathCactus,
        skyColor: 0xF0D783,
        fogColor: 0xF0D783,
        groundColor: 0xF0D783,
    },
    CLOUDY: {
        modelPath: modelPathCactus,
        skyColor: 0xF0D783,
        fogColor: 0xF0D783,
        groundColor: 0xF0D783,
    },
    RAINY: {
        modelPath: modelPathCactus,
        skyColor: 0xF0D783,
        fogColor: 0xF0D783,
        groundColor: 0xF0D783,
    }
};

export { hotTheme };
