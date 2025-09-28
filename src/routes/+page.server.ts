import { fetchFromWeatherApi } from '$lib/adapters/weatherapi';
import {
	transformCurrentLocationData,
	transformSearchData,
	type ResponseSearch,
} from '$lib/adapters/weatherApiTransformer';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, url }) => {
	const hasLocateMe = url.searchParams.has('locateMe');
	const input = url.searchParams.get('inputSubmit');

	let currentLocation = null;
	let searchResults: ReturnType<typeof transformSearchData> = [];

	try {
		if (hasLocateMe) {
			const response = await fetchFromWeatherApi.search({ fetch, location: 'auto:ip' });
			const dataSearch: ResponseSearch = (await response.json())[0];
			currentLocation = transformCurrentLocationData(dataSearch);
		} else if (input && input.trim().length > 0) {
			const response = await fetchFromWeatherApi.search({ fetch, location: input.trim() });
			const dataSearch: ResponseSearch[] = await response.json();
			searchResults = transformSearchData(dataSearch);
		}

		return { currentLocation, searchResults };
	} catch (e) {
		console.warn('Search load failed:', e);
		throw error(500, 'Search failed');
	}
};
