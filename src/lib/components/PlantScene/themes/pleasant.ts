import type { SceneTheme, ThemeMap } from "./theme";



export const modelPathSunflower = '/models/sunflower_soft.glb'; 
const basePlesantTheme: SceneTheme = {
    model: {
        path: modelPathSunflower
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
			intensity: 3.5
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
