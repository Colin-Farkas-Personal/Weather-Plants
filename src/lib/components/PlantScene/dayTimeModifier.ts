import type { BackgroundGradientColor, HSLColor } from './themes/theme.types';

const minLightnessPercent1 = 5;
const minLightnessPercent2 = 10;

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

	const updatedHslColor1 = calculateHslColorWithLightness({
		hslColor: hslColor1,
		hourOfDay,
		sunriseHour,
		sunsetHour,
		minLightnessPercent: minLightnessPercent1,
	});
	const updatedHslColor2 = calculateHslColorWithLightness({
		hslColor: hslColor2,
		hourOfDay,
		sunriseHour,
		sunsetHour,
		minLightnessPercent: minLightnessPercent2,
	});

	return [updatedHslColor1, updatedHslColor2] as BackgroundGradientColor;
}

interface CalculateHslColorWithLightnessParams {
	hslColor: HSLColor;
	hourOfDay: number;
	sunriseHour: number;
	sunsetHour: number;
	minLightnessPercent: number;
}
function calculateHslColorWithLightness({
	hslColor,
	hourOfDay,
	sunriseHour,
	sunsetHour,
	minLightnessPercent,
}: CalculateHslColorWithLightnessParams): HSLColor {
	const peakLightnessPercent = getLightnessFromHSLColor(hslColor);

	const currentDayTimeLightness = calculateLightnessAtHour({
		hourOfDay,
		lowestLightnessPercent: minLightnessPercent,
		peakLightnessPercent: peakLightnessPercent,
		sunriseHour,
		sunsetHour,
	});

	const newHslColor = updateHslColorLightness(hslColor, currentDayTimeLightness);

	return newHslColor;
}

function getLightnessFromHSLColor(hslColor: HSLColor): number {
	const hslParts = hslColor
		.replace(/hsla?\(|\)/g, '')
		.split(',')
		.map((part) => part.trim());
	const lightness = parseFloat(hslParts[2]);
	return lightness;
}

interface caclulateLightnessAtHourParams {
	hourOfDay: number;
	lowestLightnessPercent: number;
	peakLightnessPercent: number;
	sunriseHour: number;
	sunsetHour: number;
}
function calculateLightnessAtHour({
	hourOfDay,
	lowestLightnessPercent,
	peakLightnessPercent,
	sunriseHour,
	sunsetHour,
}: caclulateLightnessAtHourParams): number {
	const sr = sunriseHour;
	const ss = sunsetHour;
	const h = hourOfDay;

	const hoursOfDaylight = ss - sr;
	// Guard against invalid windows (e.g., sr >= ss) — fall back to minimum lightness
	if (!Number.isFinite(hoursOfDaylight) || hoursOfDaylight <= 0) {
		return lowestLightnessPercent;
	}

	// Normalize the hour within the daylight window to [0, 1]
	const phi = Math.max(0, Math.min(1, (h - sr) / hoursOfDaylight));

	// Half-cosine: 0 at sunrise/sunset, 1 at midpoint
	// boost = (1 - cos(2πφ)) / 2  ∈ [0,1]
	const boost = (1 - Math.cos(2 * Math.PI * phi)) / 2;

	// Interpolate between lowest and peak lightness
	return lowestLightnessPercent + (peakLightnessPercent - lowestLightnessPercent) * boost;
}

function updateHslColorLightness(hslColor: HSLColor, newLightnessPercent: number): HSLColor {
	const hslParts = hslColor
		.replace(/hsla?\(|\)/g, '')
		.split(',')
		.map((part) => part.trim());

	// Replace the lightness part (index 2) with the new lightness percent
	hslParts[2] = `${newLightnessPercent}%`;

	return `hsl(${hslParts.join(', ')})` as HSLColor;
}

export { calculateDayTimeBackgroundGradient };
