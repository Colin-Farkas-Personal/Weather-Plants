import type { SceneTheme } from "./theme.types";

const modelPathPot = '/models/pot/pot-classic.glb';

const defaultTheme: SceneTheme = {
	model: {
		pot: {
			path: modelPathPot
		},
	},
	fog: {
		color: '#ddc577ff'
	},
	ground: {
		color: '#F0D783'
	},
	lights: {
		ambient: {
			color: '#fcffbcff',
			intensity: 1
		},
		front: {
			color: '#e8ede7ff',
			intensity: 45
		}
	}
}

export { defaultTheme };