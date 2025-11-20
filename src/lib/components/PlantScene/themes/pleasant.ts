import type { SceneTheme, ThemeMap } from './theme.types';

export const modelPathSunflower = '/models/sunflower/sunflower.glb';
const basePlesantTheme: SceneTheme = {
	model: {
		plant: {
			path: modelPathSunflower,
		},
	},
	fog: {
		color: 'hsla(207, 78%, 88%, 1.00)',
		density: 0,
	},
	background: {
		color: ['hsla(206, 100%, 91%, 1.00)', 'hsla(203, 63%, 90%, 1.00)'],
	},
	lights: {
		ambient: {
			color: 'hsla(45, 100%, 80%, 1.00)',
			intensity: 1,
		},
		front: {
			color: 'hsla(50, 100%, 74%, 1.00)',
			intensity: 100,
		},
	},
};

const pleasantTheme: Partial<ThemeMap> = {
	SUNNY: {
		...basePlesantTheme,
	},
	WINDY: {
		...basePlesantTheme,
	},
	SUNNY_CLOUDY: {
		...basePlesantTheme,
	},
};

export { pleasantTheme };
