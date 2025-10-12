import { fetchFromSearchApi } from '$lib/adapters/searchapi';
import {
	transformResolveData,
	transformSearchData,
	type ResponseReverse,
	type ResponseSearch,
} from '$lib/adapters/weatherApiTransformer';
import type { LocationReverseResult, LocationSearchResult } from '$lib/types/location-search';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, url }) => {
	const inputValue = url.searchParams.get('inputSubmit');

	const latParam = url.searchParams.get('lat');
	const lonParam = url.searchParams.get('lon');

	let currentLocation: LocationReverseResult | null = null;
	let searchResults: LocationSearchResult[] = [];
	let noSearchResults: boolean | null = null;

	try {
		if (latParam && lonParam) {
			const response: Response = await fetchFromSearchApi.reverse({
				fetch,
				locationCoordinates: [Number(latParam), Number(lonParam)],
			});
			const dataReverse: ResponseReverse = await response.json();
			currentLocation = transformResolveData(dataReverse);
		} else if (inputValue && inputValue.trim().length > 0) {
			const response = await fetchFromSearchApi.search({
				fetch,
				locationName: inputValue.trim(),
			});
			const dataSearch: ResponseSearch = await response.json();

			if (!dataSearch || dataSearch.results.length === 0) {
				noSearchResults = true;
			}

			searchResults = transformSearchData(dataSearch);
		}

		console.warn('Current location:', { currentLocation, searchResults, noSearchResults });
		return { currentLocation, searchResults, noSearchResults };
	} catch (e) {
		console.warn('Search load failed:', e);
		throw error(500, 'Search failed');
	}
};
