import type { ThemeMap } from "./theme";

export const modelPathSunflower = '/models/sunflower_soft.glb'; 

// If you only want to specify a subset of ThemeMap keys, you can use Partial<ThemeMap>:
const pleasantTheme: ThemeMap = {
    SUNNY: {
        modelPath: modelPathSunflower,
        skyColor: 0x73D4EF,
        fogColor: 0x73D4EF,
        groundColor: 0xC8F3FF,
    },
    CLOUDY: {
        modelPath: modelPathSunflower,
        skyColor: 0x73D4EF,
        fogColor: 0x73D4EF,
        groundColor: 0xC8F3FF,
    },
    RAINY: {
        modelPath: modelPathSunflower,
        skyColor: 0x73D4EF,
        fogColor: 0x73D4EF,
        groundColor: 0xC8F3FF,
    }
};

export { pleasantTheme };
