import type { Fetch } from '$lib/types/fetch';

// EXAMPLE URL: http://api.weatherapi.com/v1/search.json?key=abc123&q=Göteborg
// 1. Search - Search flow
// 2. Current - Overview page
// 3. Forecast - Overview page

type Endpoint = 'search' | 'current' | 'forecast';

export const WEATHER_API_BASE_URL = 'https://api.weatherapi.com/v1/';
export const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
export const WEATHER_API_DAYS = 1;

export function getFetchUrl(
	endpoint: Endpoint,
	location: string,
	options: Record<string, unknown> = {},
): string {
	// Contruct URL
	// 1. Base url ("api.weatherapi.com...")
	const url = new URL(WEATHER_API_BASE_URL);

	// 2. Append endpoint ("search.json")
	const endpointJson = '/' + endpoint + '.json';
	url.pathname += endpointJson;

	// 3. Add Request Parameters ("?key:...")
	url.searchParams.append('key', WEATHER_API_KEY);
	url.searchParams.append('q', location);

	for (const [name, value] of Object.entries(options)) {
		url.searchParams.append(name, String(value));
	}

	return url.toString();
}

interface FetchFromWeatherApiParams {
	fetch: Fetch;
	location: string;
}
export const fetchFromWeatherApi = {
	search: async ({ fetch, location }: FetchFromWeatherApiParams): Promise<Response> => {
		const fetchUrl = getFetchUrl('search', location);
		const response = await fetch(fetchUrl);

		if (!response.ok) {
			throw new Error('Failed to fetch weather data');
		}

		return response;
	},
	current: async ({ fetch, location }: FetchFromWeatherApiParams): Promise<Response> => {
		const fetchUrl = getFetchUrl('current', location);
		const response = await fetch(fetchUrl);

		if (!response.ok) {
			throw new Error('Failed to fetch weather data');
		}

		return response;
	},
	forecast: async ({ fetch, location }: FetchFromWeatherApiParams): Promise<Response> => {
		const fetchUrl = getFetchUrl('forecast', location, { days: WEATHER_API_DAYS });
		const response = await fetch(fetchUrl);

		if (!response.ok) {
			throw new Error('Failed to fetch weather data');
		}

		return response;
	},
};
