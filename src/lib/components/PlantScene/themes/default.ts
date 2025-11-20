import type { SceneTheme } from './theme.types';

const modelPathPot = '/models/pot/pot-classic.glb';

const defaultTheme: SceneTheme = {
	model: {
		pot: {
			path: modelPathPot,
		},
	},
	fog: {
		color: 'hsla(49, 57%, 89%, 1.00)',
		density: 0,
	},
	background: {
		color: ['hsla(46, 68%, 93%, 1.00)', 'hsla(48, 100%, 91%, 1.00)'],
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
