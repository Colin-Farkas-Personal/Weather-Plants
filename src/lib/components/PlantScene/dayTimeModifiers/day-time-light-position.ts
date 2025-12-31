// Z sweep only during daylight:
// - Before sunrise:  z stays at -10
// - Sunrise -> sunset: z sweeps -10 -> 10
// - After sunset:   z stays at 10
//
// Intensity/opacity are handled elsewhere.

import { calculatePercentValueAtHour } from './percent-value-at';

interface CaclulateDayTimeLightPositionParams {
	hourOfDay: number;
	sunriseHour: number;
	sunsetHour: number;
}

export function caclulateDayTimeLightPosition({
	hourOfDay,
	sunriseHour,
	sunsetHour,
}: CaclulateDayTimeLightPositionParams): { x: number; y: number; z: number } {
	// Normalize to 0..24
	const h = ((hourOfDay % 24) + 24) % 24;

	const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
	const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

	// Guard: if sunrise/sunset are invalid, fall back to a simple 0..24 sweep.
	const isValidWindow =
		Number.isFinite(sunriseHour) && Number.isFinite(sunsetHour) && sunsetHour > sunriseHour;

	if (!isValidWindow) {
		const t = clamp01(h / 24);
		return { x: 4, y: 2.5, z: lerp(-10, 10, t) };
	}

	// Lock position outside daylight window
	if (h <= sunriseHour) return { x: 4, y: 2.5, z: -10 };
	if (h >= sunsetHour) return { x: 4, y: 2.5, z: 10 };

	// Day progress percent (monotonic sunrise -> sunset)
	// Map percent [0..1] -> z [-10..10]
	const percent = calculatePercentValueAtHour({
		hourOfDay: h,
		lowestPercent: 0,
		peakPercent: 1,
		sunriseHour,
		sunsetHour,
		shape: 'ramp',
		// Keep motion slightly biased toward midday
		gamma: 1,
	});

	return { x: 4, y: 2.5, z: lerp(-10, 10, percent) };
}
