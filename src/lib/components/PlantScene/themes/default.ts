import type { SceneTheme } from "./theme";

const modelPathEmptyPot = '/models/sunflower_vanilla.glb';

const defaultTheme: SceneTheme = {
	model: {
		path: modelPathEmptyPot
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
// const defaultTheme: SceneTheme = {
// 	modelPath: modelPathEmptyPot,
//     fogColor: '#3c00ffff',
// 	groundColor: '#C8F3FF',
// };

export { defaultTheme };