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
			intensity: 1
		},
		front: {
			color: '#e8ede7ff',
			intensity: 15
		}
	}
};

const hotTheme: Partial<ThemeMap> = {
    SUNNY: {
        ...basePlesantTheme
    },
    WINDY: {
        ...basePlesantTheme
    },
    SUNNY_CLOUDY: {
        ...basePlesantTheme,
    },
    CLOUDY: {
        ...basePlesantTheme,
        fog: {
            color: '#9c9169ff'
        },
        ground: {
            color: '#a6996cff'
        },
        lights: {
            ambient: {
                color: '#fcffbcff',
                intensity: 0.75
            },
            front: {
			    color: '#e8ede7ff',
			    intensity: 8
		    }
        }
    },
    RAINY: {
        ...basePlesantTheme,
        fog: {
            color: '#9c9169ff'
        },
        ground: {
            color: '#a6996cff'
        },
        lights: {
            ambient: {
                color: '#fcffbcff',
                intensity: 0.75
            },
            front: {
			    color: '#e8ede7ff',
			    intensity: 8
		    }
        }
    },   
    THUNDER: {
        ...basePlesantTheme,
        fog: {
            color: '#534e3aff'
        },
        ground: {
            color: '#a6996cff'
        },
        lights: {
            ambient: {
                color: '#fcffbcff',
                intensity: 0.75
            },
            front: {
			    color: '#e8ede7ff',
			    intensity: 4
		    }
        }
    },
    TORNADO: {
        ...basePlesantTheme,
        fog: {
            color: '#534e3aff'
        },
        ground: {
            color: '#a6996cff'
        },
        lights: {
            ambient: {
                color: '#fcffbcff',
                intensity: 0.75
            },
            front: {
			    color: '#e8ede7ff',
			    intensity: 4
		    }
        }
    }
};

export { hotTheme };