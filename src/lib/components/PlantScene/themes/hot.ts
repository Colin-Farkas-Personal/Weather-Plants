import type { SceneTheme, ThemeMap } from './theme.types';

export const modelPathCactus = '/models/cactus/cactus.glb';

const basePlesantTheme: SceneTheme = {
	model: {
		plant: {
			path: modelPathCactus,
		},
	},
	fog: {
		color: 'hsla(35, 38%, 82%, 1.00)',
		density: 0,
	},
	background: {
		color: ['hsla(49, 100%, 83%, 1.00)', 'hsla(48, 100%, 81%, 1.00)'],
	},
	lights: {
		ambient: {
			color: 'hsl(0, 0%, 100%)',
			intensity: 1,
		},
		front: {
			color: 'hsl(0, 0%, 100%)',
			intensity: 90,
		},
	},
};

const hotTheme: Partial<ThemeMap> = {
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

export { hotTheme };
