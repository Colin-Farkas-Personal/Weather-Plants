interface CalculatePercentValueAtHour {
	hourOfDay: number;
	lowestPercent: number;
	peakPercent: number;
	sunriseHour: number;
	sunsetHour: number;
	/** gamma < 1 broadens the curve, gamma > 1 sharpens it */
	gamma?: number;
	/**
	 * 'peak'  => 0 at sunrise/sunset, 1 at midday (half-cosine bump)
	 * 'ramp'  => 0 at sunrise, 1 at sunset (monotonic day progress)
	 */
	shape?: 'peak' | 'ramp';
}
export function calculatePercentValueAtHour({
	hourOfDay,
	lowestPercent,
	peakPercent,
	sunriseHour,
	sunsetHour,
	gamma = 0.6,
	shape = 'peak',
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

	// gamma controls curve sharpness:
	// gamma < 1 broadens the curve,
	// gamma > 1 sharpens it
	const g = Number.isFinite(gamma) && gamma > 0 ? gamma : 1;

	let boost: number;
	if (shape === 'ramp') {
		// Ease-in-out ramp: 0 at sunrise, 1 at sunset
		const ease = (1 - Math.cos(Math.PI * phi)) / 2;
		boost = Math.pow(ease, g);
	} else {
		// 'peak' (default): half-cosine bump: 0 at sunrise/sunset, 1 at midpoint
		const base = (1 - Math.cos(2 * Math.PI * phi)) / 2;
		boost = Math.pow(base, g);
	}

	// Interpolate between lowest and peak percent
	const interpolatedPercent = lowestPercent + (peakPercent - lowestPercent) * boost;

	return interpolatedPercent;
}
