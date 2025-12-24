import type { HexColor, HSLColor } from '$lib/components/PlantScene/themes/theme.types';
import type { TemperatureRange } from '$lib/types/temperature';
import { convertHexToRGB, convertHSLToRGB } from '../convert-color';
import { deriveColor, FALLBACK_COLOR } from './derivedColors';

interface calculateForegroundColorParams {
	temperatureRange: TemperatureRange | null;
	backgroundColor: HSLColor;
	priority: 'primary' | 'secondary' | 'tertiary';
}
function calculateForegroundColor({
	temperatureRange,
	backgroundColor,
	priority,
}: calculateForegroundColorParams): HexColor {
	// FALLBACK if no temperature range is provided
	if (!temperatureRange) {
		const foregroundColorFallbackLight = FALLBACK_COLOR['light'];
		const contrastRatio = getForegroundContrastRatio(
			foregroundColorFallbackLight,
			backgroundColor,
		);
		if (isContrastAA(contrastRatio)) {
			return foregroundColorFallbackLight;
		}

		const foregroundColorFallbackDark = FALLBACK_COLOR['dark'];
		const contrastRatioDark = getForegroundContrastRatio(
			foregroundColorFallbackDark,
			backgroundColor,
		);

		if (isContrastAA(contrastRatioDark)) {
			return foregroundColorFallbackDark;
		}

		return FALLBACK_COLOR['dark'];
	} else {
		const foregroundColorLight = deriveColor(
			temperatureRange,
			foreGroundColor['light'][priority],
		);
		const contrastRatio = getForegroundContrastRatio(foregroundColorLight, backgroundColor);

		if (isContrastAA(contrastRatio)) {
			return foregroundColorLight;
		}

		const foregroundColorDark = deriveColor(
			temperatureRange,
			foreGroundColor['dark'][priority],
		);
		const contrastRatioDark = getForegroundContrastRatio(foregroundColorDark, backgroundColor);

		if (isContrastAA(contrastRatioDark)) {
			return foregroundColorDark;
		}

		return FALLBACK_COLOR['dark'];
	}
}

// Priority Color Weights
const foreGroundColor = {
	light: {
		primary: 500,
		secondary: 700,
		tertiary: 800,
	},
	dark: {
		primary: 800,
		secondary: 700,
		tertiary: 600,
	},
};

function getForegroundContrastRatio(foregroundColor: HexColor, backgroundColor: HSLColor): number {
	const foregroundLinearRGB = convertHexToRGB(foregroundColor, 'linearRGB');
	const backgroundLinearRGB = convertHSLToRGB(backgroundColor, 'linearRGB');

	// 1.Compute relative Luminance for both colors
	const LForeground = calculateLuminanceValue(foregroundLinearRGB);
	const LBackground = calculateLuminanceValue(backgroundLinearRGB);

	// 2.Compute contrast ratio
	const contrastRatio = calculateContrastRatio(LForeground, LBackground);

	return contrastRatio;
}

function calculateLuminanceValue(linearRGB: number[]): number {
	const [r, g, b] = linearRGB;

	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function calculateContrastRatio(L1: number, L2: number): number {
	const lighter = Math.max(L1, L2);
	const darker = Math.min(L1, L2);
	return (lighter + 0.05) / (darker + 0.05);
}

// WCAG AA requires a contrast ratio of at least 4.5:1 for normal text
const CONTRAST_AA_THRESHOLD = 4.5;
function isContrastAA(contrastRatio: number): boolean {
	return contrastRatio >= CONTRAST_AA_THRESHOLD;
}

export { calculateForegroundColor };
