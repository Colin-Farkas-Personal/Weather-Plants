import type { SceneTheme, ThemeMap } from "./theme.types";



export const modelPathSunflower = '/models/sunflower/sunflower.glb'; 
const basePlesantTheme: SceneTheme = {
    model: {
        plant: {
            path: modelPathSunflower
        },
    },
    fog: {
        color: '#d1dbeaff'
    },
    ground: {
        color: '#f7faffff'
    },
    	lights: {
		ambient: {
			color: '#cdbcffff',
			intensity: 1
		},
		front: {
			color: '#ffeb89ff',
			intensity: 20
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
        ...basePlesantTheme,
        fog: {
            color: '#c1c7d0ff'
        },
        ground: {
            color: '#dbdfe6ff'
        },
        lights: {
            ambient: {
                color: '#cdbcffff',
                intensity: 1
            },
            front: {
                color: '#b9f1efff',
                intensity: 10
            },
            back: {
                color: '#F3FFA8',
                intensity: 0.75
            }
        }
    },
    CLOUDY: {
        ...basePlesantTheme,
        fog: {
            color: '#a1a9b6ff'
        },
        ground: {
            color: '#f7faffff'
        },
        lights: {
            ambient: {
                color: '#beaeecff',
                intensity: 1
            },
            front: {
                color: '#c2dcdfff',
                intensity: 6
            },
            back: {
                color: '#F3FFA8',
                intensity: 0.25
            }
        },
    },
    RAINY: {
        ...basePlesantTheme,
        fog: {
            color: '#a1a9b6ff'
        },
        ground: {
            color: '#f7faffff'
        },
        lights: {
            ambient: {
                color: '#beaeecff',
                intensity: 1
            },
            front: {
                color: '#c2dcdfff',
                intensity: 6
            },
            back: {
                color: '#F3FFA8',
                intensity: 0.25
            }
        },
    },
};

export { pleasantTheme };
