import type { SceneTheme, ThemeMap } from './theme.types';

export const modelPathCactus = '/models/cactus/cactus.glb';

const baseColdTheme: SceneTheme = {
	model: {
		plant: {
			path: modelPathCactus,
		},
	},
	fog: {
		color: '#ecebefff',
	},
	ground: {
		color: '#F7F5FB',
	},
	lights: {
		ambient: {
			color: '#F7F5FB',
			intensity: 0.75,
		},
		front: {
			color: '#F7F5FB',
			intensity: 70,
		},
	},
};

const coldTheme: Partial<ThemeMap> = {
	SUNNY: {
		...baseColdTheme,
	},
	WINDY: {
		...baseColdTheme,
	},
	SUNNY_CLOUDY: {
		...baseColdTheme,
	},
	CLOUDY: {
		...baseColdTheme,
		fog: {
			color: '#bfbec1ff',
		},
		ground: {
			color: '#F7F5FB',
		},
	},
	RAINY: {
		...baseColdTheme,
		fog: {
			color: '#a5a4a7ff',
		},
		ground: {
			color: '#F7F5FB',
		},
	},
	THUNDER: {
		...baseColdTheme,
		fog: {
			color: '#786f88ff',
		},
		ground: {
			color: '#d4d2d5ff',
		},
		lights: {
			ambient: {
				color: '#F7F5FB',
				intensity: 0.75,
			},
			front: {
				color: '#bbb5c5ff',
				intensity: 40,
			},
		},
	},
	TORNADO: {
		...baseColdTheme,
		fog: {
			color: '#786f88ff',
		},
		ground: {
			color: '#d4d2d5ff',
		},
		lights: {
			ambient: {
				color: '#F7F5FB',
				intensity: 0.75,
			},
			front: {
				color: '#bbb5c5ff',
				intensity: 40,
			},
		},
	},
};

export { coldTheme };
