import type { SceneTheme } from './theme.types';

const modelPathPot = '/models/pot/pot-classic.glb';

const defaultTheme: SceneTheme = {
	model: {
		plant: {
			path: getRandomModelPath(),
		},
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

function getRandomModelPath(): string {
	const modelPaths = [
		'/models/tree/tree.glb',
		'/models/sunflower/sunflower.glb',
		'/models/cactus/cactus.glb',
	];
	const randomIndex = Math.floor(Math.random() * modelPaths.length);
	return modelPaths[randomIndex];
}

export { defaultTheme };
