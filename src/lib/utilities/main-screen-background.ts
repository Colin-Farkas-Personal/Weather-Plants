import { browser } from '$app/environment';
import { applySceneCSSVariables, generateScenePalette, parseHSL } from './theme/scene-palette';

function setScreenBackgroundColor(color: string): void {
	if (!browser) return;

	document.body.style.backgroundColor = color;

	let themeMeta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement;
	if (!themeMeta) {
		themeMeta = document.createElement('meta');
		themeMeta.name = 'theme-color';
		document.head.appendChild(themeMeta);
	}
	themeMeta.content = color;

	// Generate and apply --scene-* CSS palette from the scene background color
	const base = parseHSL(color);
	if (base) {
		const palette = generateScenePalette(color);
		if (palette) {
			applySceneCSSVariables(palette, base);
		}
	}
}

export { setScreenBackgroundColor };
