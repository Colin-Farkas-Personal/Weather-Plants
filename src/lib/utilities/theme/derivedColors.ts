import type { HexColor } from '$lib/components/PlantScene/themes/theme.types';
import type { TemperatureRange } from '$lib/types/temperature';

// Fallback Colors
export const FALLBACK_COLOR = {
	light: '#FFFFFF' as HexColor,
	dark: '#000000' as HexColor,
};

// Derived colors (from _color-themes.scss)
function deriveColor(temperatureRange: TemperatureRange, colorWeight: number): HexColor {
	const rootStyles = getRootStyles();

	if (!rootStyles) {
		return getFallbackColor(colorWeight);
	}

	const colorName = mapTemperatureRangeToColorName[temperatureRange];
	const derivedColor = rootStyles.getPropertyValue(`--${colorName}-${colorWeight}`) as HexColor;

	return derivedColor as HexColor;
}

// Cache for the computed styles (initialised once)
let rootStyles: CSSStyleDeclaration | null = null;

function getRootStyles(): CSSStyleDeclaration | null {
	// SSR / non-browser: no document
	if (typeof document === 'undefined') return null;

	// First time: compute and cache
	if (!rootStyles) {
		rootStyles = getComputedStyle(document.documentElement);
	}

	return rootStyles;
}

const MID_COLOR_WEIGHT = 500;
function getFallbackColor(colorWeight: number): HexColor {
	if (colorWeight <= MID_COLOR_WEIGHT) {
		return FALLBACK_COLOR['light'];
	} else {
		return FALLBACK_COLOR['dark'];
	}
}

const mapTemperatureRangeToColorName = {
	Cold: 'snow-white',
	Pleasant: 'clear-sky',
	Hot: 'sunburn',
};

export { deriveColor };
