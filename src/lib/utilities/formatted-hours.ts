import type { WeatherOverviewRaw } from '$lib/types/weather';

function formatAstroToDayTimeHours(raw: WeatherOverviewRaw) {
	return {
		...raw,
		astro: {
			sunrise: convertTime12to24(raw.astro.sunrise),
			sunset: convertTime12to24(raw.astro.sunset),
		},
	};
}

function convertTime12to24(timeString: string): string {
	// 12:34 PM -> 12
	const [time, modifier] = timeString.split(' ');
	const timeParts = time.split(':');
	let hours = timeParts[0];
	const minutes = timeParts[1];

	if (hours === '12') {
		hours = '0';
	}

	if (modifier === 'PM') {
		hours = String(parseInt(hours, 10) + 12);
	}

	return `${hours}:${minutes}`;
}

function getHourFromTimeString(timeString: string): number {
	const [hour, minute] = timeString.split(':').map(Number);

	if (minute >= 30) {
		return hour + 1;
	}

	return hour;
}

export { formatAstroToDayTimeHours, getHourFromTimeString };
