import type { SceneTheme, ThemeMap } from './theme.types';

export const modelPathSunflower = '/models/sunflower/sunflower.glb';
const basePlesantTheme: SceneTheme = {
	model: {
		plant: {
			path: modelPathSunflower,
		},
	},
	fog: {
		color: '#9ec8edff',
	},
	ground: {
		color: '#bad3ffff',
	},
	lights: {
		ambient: {
			color: '#e5f8ffff',
			intensity: 0.75,
		},
		front: {
			color: '#eefbffff',
			intensity: 65,
		},
	},
};

const pleasantTheme: Partial<ThemeMap> = {
	SUNNY: {
		...basePlesantTheme,
	},
	SUNNY_CLOUDY: {
		...basePlesantTheme,
	},
	CLOUDY: {
		...basePlesantTheme,
		fog: {
			color: '#767b80ff',
		},
		ground: {
			color: '#f7faffff',
		},
		lights: {
			ambient: {
				color: '#bcd3ffff',
				intensity: 0.5,
			},
			front: {
				color: '#fdf1b4ff',
				intensity: 30,
			},
		},
	},
	RAINY: {
		...basePlesantTheme,
		fog: {
			color: '#8e9399ff',
		},
		ground: {
			color: '#f7faffff',
		},
		lights: {
			ambient: {
				color: '#bcd3ffff',
				intensity: 0.5,
			},
			front: {
				color: '#fdf1b4ff',
				intensity: 30,
			},
		},
	},
	THUNDER: {
		...basePlesantTheme,
		fog: {
			color: '#3d4650ff',
		},
		ground: {
			color: '#f7faffff',
		},
		lights: {
			ambient: {
				color: '#bcd3ffff',
				intensity: 0.5,
			},
			front: {
				color: '#fdf1b4ff',
				intensity: 15,
			},
		},
	},
	TORNADO: {
		...basePlesantTheme,
		fog: {
			color: '#3d4650ff',
		},
		ground: {
			color: '#f7faffff',
		},
		lights: {
			ambient: {
				color: '#bcd3ffff',
				intensity: 0.5,
			},
			front: {
				color: '#fdf1b4ff',
				intensity: 15,
			},
		},
	},
};

export { pleasantTheme };
