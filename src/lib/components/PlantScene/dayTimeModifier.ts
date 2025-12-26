import type { BackgroundGradientColor, HSLColor } from './themes/theme.types';

const minLightnessPercent1 = 5;
const minLightnessPercent2 = 10;
const minSaturationPercent1 = 5;
const minSaturationPercent2 = 10;

interface CalculateDayTimeShadowOpacityParams {
	hourOfDay: number;
	sunriseHour: number;
	sunsetHour: number;
}
function calculateDayTimeShadowOpacity({
	hourOfDay,
	sunriseHour,
	sunsetHour,
}: CalculateDayTimeShadowOpacityParams): number {
	// Shadow opacity ranges from 0.1 (day) to 0.5 (night)
	const maxOpacity = 0.5;

	const opacityPercent = calculatePercentValueAtHour({
		hourOfDay,
		lowestPercent: 0,
		peakPercent: 1,
		sunriseHour,
		sunsetHour,
		gamma: 1.2,
	});

	return maxOpacity * opacityPercent;
}

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
function calculateDayTimeBackgroundGradient({
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

interface CaclulateDayTimeLightPositionParams {
	hourOfDay: number;
	sunriseHour: number;
	sunsetHour: number;
}

// Z sweep for a full 24h loop:
// - Day (sunrise -> sunset):    z goes -10 -> 10
// - Night (sunset -> sunrise):  z goes 10  -> -10
//
// This keeps motion continuous while allowing shadows/intensity to be controlled elsewhere.

function caclulateDayTimeLightPosition({
	hourOfDay,
	sunriseHour,
	sunsetHour,
}: CaclulateDayTimeLightPositionParams): { x: number; y: number; z: number } {
	// Normalize to 0..24
	const h = ((hourOfDay % 24) + 24) % 24;

	// Guard: if sunrise/sunset are invalid, fall back to a simple 0..24 sweep.
	const isValidWindow =
		Number.isFinite(sunriseHour) && Number.isFinite(sunsetHour) && sunsetHour > sunriseHour;

	const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
	const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

	// Ease that moves quickly early and slows later (helps the night return feel "quicker")
	const easeOut = (t: number, power = 2.5) => 1 - Math.pow(1 - clamp01(t), power);

	// Fallback: map the whole day 0..24 to -10..10
	if (!isValidWindow) {
		const t = clamp01(h / 24);
		return { x: 4, y: 2.5, z: lerp(-10, 10, t) };
	}

	const sr = sunriseHour;
	const ss = sunsetHour;

	// Daytime window
	const isDay = h >= sr && h <= ss;

	if (isDay) {
		const dayLength = ss - sr;
		const t = dayLength > 0 ? clamp01((h - sr) / dayLength) : 0;
		return { x: 4, y: 2.5, z: lerp(-10, 10, t) };
	}

	// Night window wraps around midnight: ss -> 24 -> sr
	const nightLength = 24 - ss + sr;
	const hoursSinceSunset = h >= ss ? h - ss : h + 24 - ss;

	// Make the return feel faster early in the night via easeOut.
	const tNight = nightLength > 0 ? easeOut(hoursSinceSunset / nightLength, 2.5) : 0;
	return { x: 4, y: 2.5, z: lerp(10, -10, tNight) };
}

interface CalculatePercentValueAtHour {
	hourOfDay: number;
	lowestPercent: number;
	peakPercent: number;
	sunriseHour: number;
	sunsetHour: number;
	/** gamma < 1 broadens the peak, gamma > 1 sharpens it */
	gamma?: number;
}
function calculatePercentValueAtHour({
	hourOfDay,
	lowestPercent,
	peakPercent,
	sunriseHour,
	sunsetHour,
	gamma = 0.6,
}: CalculatePercentValueAtHour): number {
	const sr = sunriseHour;
	const ss = sunsetHour;
	const h = hourOfDay;

	const hoursOfDaylight = ss - sr;
	// Guard against invalid windows (e.g., sr >= ss) — fall back to minimum percent value
	if (!Number.isFinite(hoursOfDaylight) || hoursOfDaylight <= 0) {
		return lowestPercent;
	}

	// Normalize the hour within the daylight window to [0, 1]
	const phi = Math.max(0, Math.min(1, (h - sr) / hoursOfDaylight));

	// Half-cosine: 0 at sunrise/sunset, 1 at midpoint
	// base value for the boost
	const base = (1 - Math.cos(2 * Math.PI * phi)) / 2;

	// gamma controls the sharpness of the peak:
	// gamma < 1 broadens the peak (flatter top),
	// gamma > 1 sharpens it (pointier peak)
	const g = Number.isFinite(gamma) && gamma > 0 ? gamma : 1;
	const boost = Math.pow(base, g);

	// Interpolate between lowest and peak percent
	const interpolatedPercent = lowestPercent + (peakPercent - lowestPercent) * boost;

	return interpolatedPercent;
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

export {
	calculateDayTimeShadowOpacity,
	calculateDayTimeBackgroundGradient,
	caclulateDayTimeLightPosition,
};
