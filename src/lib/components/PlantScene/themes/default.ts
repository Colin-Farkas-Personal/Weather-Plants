import type { HSLColor, SceneTheme } from './theme.types';

const backgroundGradientDefault: [HSLColor, HSLColor] = [
	'hsla(49, 100%, 50%, 1.00)',
	'hsla(48, 100%, 45%, 1.00)',
];

const modelPathPot = '/models/pot/pot-classic.glb';

const defaultTheme: SceneTheme = {
	model: {
		pot: {
			path: modelPathPot,
		},
	},
	shadow: {
		opacity: 0.5,
	},
	fog: {
		density: 0,
	},
	background: {
		color: backgroundGradientDefault,
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

export { defaultTheme };
