import { calculatePercentValueAtHour } from './percent-value-at';

interface CalculateDayTimeShadowOpacityParams {
	hourOfDay: number;
	sunriseHour: number;
	sunsetHour: number;
}
export function calculateDayTimeShadowOpacity({
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
