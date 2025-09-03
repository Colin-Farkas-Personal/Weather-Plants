import type { Fetch } from '$lib/types/fetch';

export const WEATHER_API_URL = 'https://api.weatherapi.com/v1/forecast.json';
export const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
export const WEATHER_API_DAYS = 1;

export function getFetchUrl(apiKey: string, location: string, days: number): string {
	const parameters = new URLSearchParams({
		key: apiKey,
		q: location,
		days: days.toString(),
	}).toString();

	return WEATHER_API_URL + '?' + parameters;
}

interface FetchFromWeatherApiParams {
	fetch: Fetch;
	location: string;
}
export async function fetchFromWeatherApi({
	fetch,
	location,
}: FetchFromWeatherApiParams): Promise<Response> {
	const fetchUrl = getFetchUrl(WEATHER_API_KEY, location, WEATHER_API_DAYS);
	const response = await fetch(fetchUrl);

	if (!response.ok) {
		throw new Error('Failed to fetch weather data');
	}

	return response;
}
