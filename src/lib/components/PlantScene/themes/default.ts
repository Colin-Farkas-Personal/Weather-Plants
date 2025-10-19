import type { SceneTheme } from './theme.types';

const modelPathPot = '/models/pot/pot-classic.glb';

const defaultTheme: SceneTheme = {
	model: {
		pot: {
			path: modelPathPot,
		},
	},
	fog: {
		color: '#fff9e4ff',
	},
	ground: {
		color: '#fff4cdff',
	},
	lights: {
		ambient: {
			color: '#fff9e4ff',
			intensity: 1,
		},
		front: {
			color: '#fff4cdff',
			intensity: 100,
		},
	},
};

export { defaultTheme };
