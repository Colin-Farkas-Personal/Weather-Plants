import type { HSLColor, SceneTheme, ThemeMap } from './theme.types';

export const modelPathCactus = '/models/cactus/cactus.glb';

const backgroundGradientColor50: [HSLColor, HSLColor] = [
	'hsla(49, 70%, 80%, 1.00)',
	'hsla(48, 70%, 75%, 1.00)',
];
const backgroundGradientColor100: [HSLColor, HSLColor] = [
	'hsla(49, 100%, 70%, 1.00)',
	'hsla(48, 100%, 75%, 1.00)',
];
const backgroundGradientColor200: [HSLColor, HSLColor] = [
	'hsla(49, 100%, 50%, 1.00)',
	'hsla(48, 100%, 45%, 1.00)',
];

const baseHotTheme: SceneTheme = {
	model: {
		plant: {
			path: modelPathCactus,
		},
	},
	shadow: {
		opacity: 0.5,
	},
	fog: {
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

const hotTheme: Partial<ThemeMap> = {
	SUNNY: {
		...baseHotTheme,
	},
	CLEAR: {
		...baseHotTheme,
	},
	WINDY: {
		...baseHotTheme,
	},
	PARTLY_CLOUDY: {
		...baseHotTheme,
	},
	CLOUDY: {
		...baseHotTheme,
		background: {
			color: backgroundGradientColor100,
		},
	},
	FOGGY: {
		...baseHotTheme,
		shadow: {
			opacity: 0,
		},
		fog: {
			density: 0.6,
		},
	},
	RAINY: {
		...baseHotTheme,
		background: {
			color: backgroundGradientColor100,
		},
	},
	THUNDER: {
		...baseHotTheme,
		background: {
			color: backgroundGradientColor200,
		},
	},
	TORNADO: {
		...baseHotTheme,
		background: {
			color: backgroundGradientColor200,
		},
	},
	SNOWY: {
		...baseHotTheme,
		background: {
			color: backgroundGradientColor200,
		},
	},
	FREEZING: {
		...baseHotTheme,
		background: {
			color: backgroundGradientColor200,
		},
	},
};

export { hotTheme };
