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
			intensity: 2
		},
		front: {
			color: '#fff2afff',
			intensity: 2.5
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
