import type { SceneTheme } from "./theme.types";

const modelPathPot = '/models/pot/pot-classic.glb';

const defaultTheme: SceneTheme = {
	model: {
		pot: {
			path: modelPathPot
		},
	},
	fog: {
		color: '#e3e3e3ff'
	},
	ground: {
		color: '#d7d7d7ff'
	},
	lights: {
		ambient: {
			color: '#ffffffff',
			intensity: 1
		},
		front: {
			color: '#ffffffff',
			intensity: 45
		}
	}
}

export { defaultTheme };