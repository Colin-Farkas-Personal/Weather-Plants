import type { BackgroundGradientColor, HSLColor } from '../themes/theme.types';
import { calculatePercentValueAtHour } from './percent-value-at';

const minLightnessPercent1 = 20;
const minLightnessPercent2 = 5;
const minSaturationPercent1 = 20;
const minSaturationPercent2 = 5;

interface CalculateDayTimeBackgroundGradientParams {
	hourOfDay: number;
	sunriseHour: number;
	sunsetHour: number;
	baseGradient: BackgroundGradientColor;
}

// Highest luminance - bacgkroundGradient[0] & bacgkroundGradient[1]
// Lowest lumninance - ([0])5% & ([1])10%
// x = currentHour (0-23)
// y = luminance (currentGradientLowest-currentGradientHighest)
export function calculateDayTimeBackgroundGradient({
	hourOfDay,
	sunriseHour,
	sunsetHour,
	baseGradient,
}: CalculateDayTimeBackgroundGradientParams) {
	const [hslColor1, hslColor2] = baseGradient;

	const updatedHslColor1 = adjustColorHSL({
		hslColor: hslColor1,
		hourOfDay,
		sunriseHour,
		sunsetHour,
		minLightnessPercent: minLightnessPercent1,
		minSaturationPercent: minSaturationPercent1,
	});
	const updatedHslColor2 = adjustColorHSL({
		hslColor: hslColor2,
		hourOfDay,
		sunriseHour,
		sunsetHour,
		minLightnessPercent: minLightnessPercent2,
		minSaturationPercent: minSaturationPercent2,
	});

	return [updatedHslColor1, updatedHslColor2] as BackgroundGradientColor;
}

interface AdjustColorHSLParams {
	hslColor: HSLColor;
	hourOfDay: number;
	sunriseHour: number;
	sunsetHour: number;
	minLightnessPercent: number;
	minSaturationPercent: number;
}
function adjustColorHSL({
	hslColor,
	hourOfDay,
	sunriseHour,
	sunsetHour,
	minLightnessPercent,
	minSaturationPercent,
}: AdjustColorHSLParams): HSLColor {
	const peakSaturationPercent = getValueFromHSLColor(hslColor, 'Saturation');
	const peakLightnessPercent = getValueFromHSLColor(hslColor, 'Lightness');

	const currentDayTimeSaturation = calculatePercentValueAtHour({
		hourOfDay,
		lowestPercent: minSaturationPercent,
		peakPercent: peakSaturationPercent,
		sunriseHour,
		sunsetHour,
	});
	const currentDayTimeLightness = calculatePercentValueAtHour({
		hourOfDay,
		lowestPercent: minLightnessPercent,
		peakPercent: peakLightnessPercent,
		sunriseHour,
		sunsetHour,
	});

	const newHSLColorSaturation = setHslSaturationAndLightness(
		hslColor,
		currentDayTimeSaturation,
		currentDayTimeLightness,
	);

	return newHSLColorSaturation;
}

const HSLValues = {
	Hue: 0,
	Saturation: 1,
	Lightness: 2,
} as const;
type HSLValue = keyof typeof HSLValues;

function getValueFromHSLColor(hslColor: HSLColor, value: HSLValue): number {
	const hslParts = hslColor
		.replace(/hsla?\(|\)/g, '')
		.split(',')
		.map((part) => part.trim());

	const valueIndex = HSLValues[value];
	const lightness = parseFloat(hslParts[valueIndex]);
	return lightness;
}

function setHslSaturationAndLightness(
	hslColor: HSLColor,
	newSaturationPercent: number,
	newLightnessPercent: number,
): HSLColor {
	const hslParts = hslColor
		.replace(/hsla?\(|\)/g, '')
		.split(',')
		.map((part) => part.trim());

	hslParts[1] = `${newSaturationPercent}%`;
	hslParts[2] = `${newLightnessPercent}%`;

	return `hsl(${hslParts.join(', ')})` as HSLColor;
}
