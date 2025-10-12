import type { Fetch } from '$lib/types/fetch';

type Endpoint = 'search' | 'reverse';

export const SEARCH_API_BASE_URL = 'https://api.geoapify.com/v1/geocode';
export const SEARCH_API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

export function getFetchUrl(endpoint: Endpoint, options: Record<string, unknown> = {}): string {
	const url = new URL(SEARCH_API_BASE_URL);
	url.pathname += '/' + endpoint;
	url.searchParams.append('format', 'json');
	url.searchParams.append('apiKey', SEARCH_API_KEY);

	for (const [name, value] of Object.entries(options)) {
		if (value != null) url.searchParams.append(name, String(value));
	}

	console.warn('Fetching from URL:', url.toString());

	return url.toString();
}

interface FetchFromSearchApiParams {
	fetch: Fetch;
	locationName?: string;
	locationCoordinates?: [number, number];
}

async function doFetch(url: string, fetchFn: Fetch) {
	const res = await fetchFn(url);
	if (!res.ok) throw new Error('Failed to fetch search data');
	return res;
}

export const fetchFromSearchApi = {
	search: async ({ fetch, locationName }: FetchFromSearchApiParams) => {
		const url = getFetchUrl('search', { text: locationName });
		return doFetch(url, fetch);
	},
	reverse: async ({ fetch, locationCoordinates }: FetchFromSearchApiParams) => {
		const [lat, lon] = locationCoordinates || [0, 0];
		const url = getFetchUrl('reverse', { lat, lon });
		return doFetch(url, fetch);
	},
};
