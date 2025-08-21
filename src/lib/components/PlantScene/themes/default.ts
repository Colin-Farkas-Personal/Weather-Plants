import type { SceneTheme } from "./theme";

const modelPathEmptyPot = '/models/sunflower_vanilla.glb';

const defaultTheme: SceneTheme = {
	modelPath: modelPathEmptyPot,
	skyColor: 0x73D4EF,
    fogColor: 0xC8F3FF,
	groundColor: 0xC8F3FF,
};

export { defaultTheme };