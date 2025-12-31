import { calculatePercentValueAtHour } from './percent-value-at';

interface CaclulateDayTimeLightIntensityParams {
	hourOfDay: number;
	sunriseHour: number;
	sunsetHour: number;
	minIntensity: number;
	maxIntensity: number;
}

export function calculateDayTimeLightIntensity({
	hourOfDay,
	sunriseHour,
	sunsetHour,
	minIntensity,
	maxIntensity,
}: CaclulateDayTimeLightIntensityParams): number {
	// Normalize to 0..24 to keep behavior stable even if caller passes values outside the range.
	const h = ((hourOfDay % 24) + 24) % 24;

	// Ensure the intensity bounds are sane.
	const min = Number.isFinite(minIntensity) ? minIntensity : 0;
	const max = Number.isFinite(maxIntensity) ? maxIntensity : min;
	const low = Math.min(min, max);
	const high = Math.max(min, max);

	// If sunrise/sunset are invalid (or polar-day-like), fall back to a simple full-day curve.
	const isValidWindow =
		Number.isFinite(sunriseHour) && Number.isFinite(sunsetHour) && sunsetHour > sunriseHour;

	if (!isValidWindow) {
		// Full 24h half-cosine: low at midnight & noon ends, high at midday.
		const t = Math.max(0, Math.min(1, h / 24));
		const base = (1 - Math.cos(2 * Math.PI * t)) / 2;
		// Slightly sharper peak than the background gradient.
		const boost = Math.pow(base, 1.1);
		return low + (high - low) * boost;
	}

	// Daylight curve: low at sunrise/sunset and night, peak around midday.
	return calculatePercentValueAtHour({
		hourOfDay: h,
		lowestPercent: low,
		peakPercent: high,
		sunriseHour,
		sunsetHour,
		// A slightly sharper peak makes the "sun" feel brighter around midday.
		gamma: 1.1,
	});
}
