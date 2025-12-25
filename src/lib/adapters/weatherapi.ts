import type { Fetch } from '$lib/types/fetch';

type Endpoint = 'search' | 'current' | 'forecast' | 'timezone';

export const WEATHER_API_BASE_URL = 'https://api.weatherapi.com/v1/';
export const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
export const WEATHER_API_DAYS = 1;

export function getFetchUrl(
	endpoint: Endpoint,
	location: string,
	options: Record<string, unknown> = {},
): string {
	const url = new URL(WEATHER_API_BASE_URL);
	url.pathname += '/' + endpoint + '.json';
	url.searchParams.append('key', WEATHER_API_KEY);
	url.searchParams.append('q', location);

	for (const [name, value] of Object.entries(options)) {
		if (value != null) url.searchParams.append(name, String(value));
	}

	console.warn('Fetching from URL:', url.toString());

	return url.toString();
}

interface FetchFromWeatherApiParams {
	fetch: Fetch;
	location: string;
}

async function doFetch(url: string, fetchFn: Fetch) {
	const res = await fetchFn(url);
	if (!res.ok) throw new Error('Failed to fetch weather data');
	return res;
}

export const fetchFromWeatherApi = {
	current: async ({ fetch, location }: FetchFromWeatherApiParams) => {
		const url = getFetchUrl('current', location);
		return doFetch(url, fetch);
	},
	forecast: async ({ fetch, location }: FetchFromWeatherApiParams) => {
		const url = getFetchUrl('forecast', location, { days: WEATHER_API_DAYS });
		return doFetch(url, fetch);
	},
	timeZone: async ({ fetch, location }: FetchFromWeatherApiParams) => {
		const url = getFetchUrl('timezone', location);
		return doFetch(url, fetch);
	},
};
