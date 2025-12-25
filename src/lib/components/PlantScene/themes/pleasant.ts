import type { HSLColor, SceneTheme, ThemeMap } from './theme.types';

export const modelPathSunflower = '/models/sunflower/sunflower.glb';

const backgroundGradientColor50: [HSLColor, HSLColor] = [
	'hsla(206, 100%, 85%, 1.00)',
	'hsla(203, 70%, 90%, 1.00)',
];
const backgroundGradientColor100: [HSLColor, HSLColor] = [
	'hsla(0, 100%, 70%, 1.00)',
	'hsla(0, 100%, 90%, 1.00)',
];
const backgroundGradientColor200: [HSLColor, HSLColor] = [
	'hsla(0, 100%, 50%, 1.00)',
	'hsla(0, 100%, 70%, 1.00)',
];

const basePleasantTheme: SceneTheme = {
	model: {
		plant: {
			path: modelPathSunflower,
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
		...basePleasantTheme,
	},
	CLEAR: {
		...basePleasantTheme,
	},
	WINDY: {
		...basePleasantTheme,
	},
	PARTLY_CLOUDY: {
		...basePleasantTheme,
	},
	CLOUDY: {
		...basePleasantTheme,
		background: {
			color: backgroundGradientColor100,
		},
	},
	FOGGY: {
		...basePleasantTheme,
		shadow: {
			opacity: 0,
		},
		fog: {
			density: 0.6,
		},
	},
	RAINY: {
		...basePleasantTheme,
		background: {
			color: backgroundGradientColor100,
		},
	},
	THUNDER: {
		...basePleasantTheme,
		background: {
			color: backgroundGradientColor200,
		},
	},
	TORNADO: {
		...basePleasantTheme,
		background: {
			color: backgroundGradientColor200,
		},
	},
};

export { pleasantTheme };
