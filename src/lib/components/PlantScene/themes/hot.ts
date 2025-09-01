import type { SceneTheme, ThemeMap } from "./theme.types";

export const modelPathCactus = '/models/cactus/cactus.glb'; 

const basePlesantTheme: SceneTheme = {
    model: {
        plant: {
            path: modelPathCactus
        }
    },
    fog: {
        color: '#ddc577ff'
    },
    ground: {
        color: '#F0D783'
    },
    lights: {
		ambient: {
			color: '#fcffbcff',
			intensity: 0.5
		},
		front: {
			color: '#e8ede7ff',
			intensity: 25
		},
		back: {
			color: '#F3FFA8',
			intensity: 0.25
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
        ...basePlesantTheme,
        fog: {
            color: '#9a8e66ff'
        },
        ground: {
            color: '#d3cdbbff'
        },
        lights: {
            ambient: {
                color: '#ced392ff',
                intensity: 1.25
            },
            front: {
                color: '#aab07fff',
                intensity: 2
            },
            back: {
                color: '#a4acd1ff',
                intensity: 0.3
            }
        }
    },
    RAINY: {
        ...basePlesantTheme,
    }
};

export { hotTheme };