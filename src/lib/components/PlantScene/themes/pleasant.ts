import type { SceneTheme, ThemeMap } from './theme.types';

export const modelPathSunflower = '/models/sunflower/sunflower.glb';
const basePlesantTheme: SceneTheme = {
	model: {
		plant: {
			path: modelPathSunflower,
		},
	},
	fog: {
		color: '#a4c7e6ff',
	},
	ground: {
		color: '#cde7ffff',
	},
	lights: {
		ambient: {
			color: '#e5f8ffff',
			intensity: 0.75,
		},
		front: {
			color: '#ffffffff',
			intensity: 65,
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
	CLOUDY: {
		...basePlesantTheme,
		fog: {
			color: '#96a2acff',
		},
	},
	RAINY: {
		...basePlesantTheme,
		fog: {
			color: '#79838bff',
		},
		ground: {
			color: '#a4b8cbff',
		},
	},
	THUNDER: {
		...basePlesantTheme,
		fog: {
			color: '#505d68ff',
		},
		ground: {
			color: '#768b9fff',
		},
	},
	TORNADO: {
		...basePlesantTheme,
		fog: {
			color: '#505d68ff',
		},
		ground: {
			color: '#768b9fff',
		},
	},
};

export { pleasantTheme };
