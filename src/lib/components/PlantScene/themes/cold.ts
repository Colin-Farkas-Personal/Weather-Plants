import type { HSLColor, SceneTheme, ThemeMap } from './theme.types';

export const modelPathTree = '/models/tree/tree.glb';

const backgroundGradientColor50: [HSLColor, HSLColor] = [
	'hsla(0, 0%, 95%, 1.00)',
	'hsla(0, 0%, 90%, 1.00)',
];
const backgroundGradientColor100: [HSLColor, HSLColor] = [
	'hsla(0, 0%, 70%, 1.00)',
	'hsla(0, 0%, 90%, 1.00)',
];
const backgroundGradientColor100Snow: [HSLColor, HSLColor] = [
	'hsla(0, 0%, 70%, 1.00)',
	'hsla(0, 0%, 100%, 1.00)',
];
const backgroundGradientColor200: [HSLColor, HSLColor] = [
	'hsla(0, 0%, 50%, 1.00)',
	'hsla(0, 0%, 70%, 1.00)',
];

const baseColdTheme: SceneTheme = {
	model: {
		plant: {
			path: modelPathTree,
		},
	},
	fog: {
		color: 'hsla(0, 0%, 92%, 1.00)',
		density: 0,
	},
	background: {
		color: backgroundGradientColor50,
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

const coldTheme: Partial<ThemeMap> = {
	SUNNY: {
		...baseColdTheme,
	},
	WINDY: {
		...baseColdTheme,
	},
	PARTLY_CLOUDY: {
		...baseColdTheme,
	},
	FREEZING: {
		...baseColdTheme,
	},
	CLOUDY: {
		...baseColdTheme,
		background: {
			color: backgroundGradientColor100,
		},
	},
	FOGGY: {
		...baseColdTheme,
		fog: {
			color: 'hsla(0, 0%, 95%, 1.00)',
			density: 0.6,
		},
	},
	RAINY: {
		...baseColdTheme,
		background: {
			color: backgroundGradientColor100,
		},
	},
	SNOWY: {
		...baseColdTheme,
		background: {
			color: backgroundGradientColor100Snow,
		},
	},
	THUNDER: {
		...baseColdTheme,
		background: {
			color: backgroundGradientColor200,
		},
	},
	TORNADO: {
		...baseColdTheme,
		background: {
			color: backgroundGradientColor200,
		},
	},
};

export { coldTheme };
