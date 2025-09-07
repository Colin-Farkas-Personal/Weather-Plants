import type { SceneTheme, ThemeMap } from './theme.types';

export const modelPathCactus = '/models/cactus/cactus.glb';

const basePlesantTheme: SceneTheme = {
	model: {
		plant: {
			path: modelPathCactus,
		},
	},
	fog: {
		color: '#f4d87bff',
	},
	ground: {
		color: '#ffe385ff',
	},
	lights: {
		ambient: {
			color: '#fcffbcff',
			intensity: 0.75,
		},
		front: {
			color: '#e8ede7ff',
			intensity: 70,
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
	CLOUDY: {
		...basePlesantTheme,
		fog: {
			color: '#bab08bff',
		},
		ground: {
			color: '#cab671ff',
		},
	},
	RAINY: {
		...basePlesantTheme,
		fog: {
			color: '#968f76ff',
		},
		ground: {
			color: '#ac9e69ff',
		},
	},
	THUNDER: {
		...basePlesantTheme,
		fog: {
			color: '#69634dff',
		},
		ground: {
			color: '#cab671ff',
		},
		lights: {
			ambient: {
				color: '#e5e5e0ff',
				intensity: 0.75,
			},
			front: {
				color: '#989c98ff',
				intensity: 70,
			},
		},
	},
	TORNADO: {
		...basePlesantTheme,
		fog: {
			color: '#69634dff',
		},
		ground: {
			color: '#cab671ff',
		},
		lights: {
			ambient: {
				color: '#e5e5e0ff',
				intensity: 0.75,
			},
			front: {
				color: '#989c98ff',
				intensity: 70,
			},
		},
	},
};

export { hotTheme };
