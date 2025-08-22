import type { SceneTheme, ThemeMap } from "./theme";

export const modelPathCactus = '/models/cactus_day.glb'; 

const basePlesantTheme: SceneTheme = {
    model: {
        path: modelPathCactus
    },
    fog: {
        color: '#F0D783'
    },
    ground: {
        color: '#F0D783'
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

const hotTheme: Partial<ThemeMap> = {
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

export { hotTheme };