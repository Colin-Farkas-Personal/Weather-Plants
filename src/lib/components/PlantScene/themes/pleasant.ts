import type { SceneTheme, ThemeMap } from "./theme";

export const modelPathSunflower = '/models/sunflower_soft.glb'; 

const basePlesantTheme: SceneTheme = {
    model: {
        path: modelPathSunflower
    },
    fog: {
        color: '#9bc8ffff'
    },
    ground: {
        color: '#ffffffff'
    },
    	lights: {
		ambient: {
			color: '#fcffbcff',
			intensity: 1
		},
		front: {
			color: '#f6ff00ff',
			intensity: 3
		},
		back: {
			color: '#F3FFA8',
			intensity: 0.75
		}
	}
};

const pleasantTheme: Partial<ThemeMap> = {
    SUNNY: {
        ...basePlesantTheme
    },
    SUNNY_CLOUDY: {
        ...basePlesantTheme
    },
    CLOUDY: {
        ...basePlesantTheme
    },
    RAINY: {
        ...basePlesantTheme,
    }
};

export { pleasantTheme };
