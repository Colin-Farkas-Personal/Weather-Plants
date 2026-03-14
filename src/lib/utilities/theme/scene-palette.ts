import { browser } from '$app/environment';
import { toHSLString } from '../convert-color';

interface HSLComponents {
	h: number;
	s: number;
	l: number;
}

type ScenePalette = Record<number, string>;

const SHADE_LIGHTNESS: Record<number, number> = {
	50: 97,
	100: 93,
	200: 87,
	300: 78,
	400: 67,
	500: 55,
	600: 45,
	700: 35,
	800: 25,
	900: 15,
};

/** Parse an HSL or HSLA string into its numeric components. */
function parseHSL(hslString: string): HSLComponents | null {
	const match = hslString.match(/hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%/);
	if (!match) return null;
	return {
		h: parseFloat(match[1]),
		s: parseFloat(match[2]),
		l: parseFloat(match[3]),
	};
}

/**
 * Generate a 10-shade palette (50–900) from a base HSL color string.
 * Keeps the hue, slightly reduces saturation at extremes for a natural feel.
 */
function generateScenePalette(hslColor: string): ScenePalette | null {
	const base = parseHSL(hslColor);
	if (!base) return null;

	const palette: ScenePalette = {};

	for (const [shade, lightness] of Object.entries(SHADE_LIGHTNESS)) {
		const shadeNum = Number(shade);
		// Reduce saturation at extreme lightness values
		const saturationScale = shadeNum <= 100 ? 0.6 : shadeNum >= 800 ? 0.7 : 1;
		const s = Math.round(base.s * saturationScale);
		palette[shadeNum] = `hsl(${base.h}, ${s}%, ${lightness}%)`;
	}

	return palette;
}

const SEMANTIC_MAP: Record<string, number> = {
	'text-primary': 900,
	'text-secondary': 800,
	'text-tertiary': 700,
	'text-primary-inversed': 900,
	'icon-primary': 900,
	'icon-secondary': 800,
};

/**
 * Compute a component background color as a near-white tint of the base hue.
 * Always targets a fixed high lightness so all colors produce a clean,
 * light card — matching the look of the light blue theme.
 */
function computeComponentBgColor(base: HSLComponents, targetL: number): HSLComponents {
	// Low saturation keeps it feeling like a gentle tint, not a bold color
	const targetS = Math.min(Math.round(base.s * 0.35), 30);
	return {
		h: base.h,
		s: targetS,
		l: targetL,
	};
}

/** Set --scene-* CSS custom properties on :root from a generated palette. */
function applySceneCSSVariables(palette: ScenePalette, base: HSLComponents): void {
	if (!browser) return;

	const style = document.documentElement.style;

	// Raw shades: --scene-50 … --scene-900
	for (const [shade, value] of Object.entries(palette)) {
		style.setProperty(`--scene-${shade}`, value);
	}

	// Semantic aliases: --scene-bg-primary, --scene-text-primary, etc.
	for (const [name, shade] of Object.entries(SEMANTIC_MAP)) {
		style.setProperty(`--scene-${name}`, palette[shade]);
	}

	// Adaptive component backgrounds - near-white tint of the scene hue
	const componentBgPrimary = computeComponentBgColor(base, 90);
	const componentBgSecondary = computeComponentBgColor(base, 85);
	style.setProperty('--scene-bg-primary', toHSLString(componentBgPrimary));
	style.setProperty('--scene-bg-secondary', toHSLString(componentBgSecondary));
}

export { generateScenePalette, applySceneCSSVariables, parseHSL };
