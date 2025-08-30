import type { SceneTheme } from "./theme.types";

const modelPathPot = '/models/pot/pot-classic.glb';

const defaultTheme: SceneTheme = {
	model: {
		pot: {
			path: modelPathPot
		},
	},
	fog: {
		color: '#3c00ffff'
	},
	ground: {
		color: '#C8F3FF'
	},
	lights: {
		ambient: {
			color: '#ffffff',
			intensity: 1
		},
		front: {
			color: '#F3FFA8',
			intensity: 10.75
		},
		back: {
			color: '#F3FFA8',
			intensity: 0.75
		}
	}
}

export { defaultTheme };