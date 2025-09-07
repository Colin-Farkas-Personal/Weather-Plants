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
			intensity: 65,
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
			color: '#9c9169ff',
		},
		ground: {
			color: '#F0D783',
		},
		lights: {
			ambient: {
				color: '#fcffbcff',
				intensity: 0.75,
			},
			front: {
				color: '#e8ede7ff',
				intensity: 25,
			},
		},
	},
	RAINY: {
		...basePlesantTheme,
		fog: {
			color: '#9c9169ff',
		},
		ground: {
			color: '#F0D783',
		},
		lights: {
			ambient: {
				color: '#fcffbcff',
				intensity: 0.75,
			},
			front: {
				color: '#e8ede7ff',
				intensity: 25,
			},
		},
	},
	THUNDER: {
		...basePlesantTheme,
		fog: {
			color: '#534e3aff',
		},
		ground: {
			color: '#baaa76ff',
		},
		lights: {
			ambient: {
				color: '#fcffbcff',
				intensity: 0.75,
			},
			front: {
				color: '#e8ede7ff',
				intensity: 20,
			},
		},
	},
	TORNADO: {
		...basePlesantTheme,
		fog: {
			color: '#534e3aff',
		},
		ground: {
			color: '#baaa76ff',
		},
		lights: {
			ambient: {
				color: '#fcffbcff',
				intensity: 0.75,
			},
			front: {
				color: '#e8ede7ff',
				intensity: 20,
			},
		},
	},
};

export { hotTheme };
