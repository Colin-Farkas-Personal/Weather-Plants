import { fetchFromSearchApi } from '$lib/adapters/searchapi';
import {
	transformResolveData,
	transformSearchData,
	type ResponseReverse,
	type ResponseSearch,
} from '$lib/adapters/weatherApiTransformer';
import type { Fetch } from '$lib/types/fetch';
import type { LocationReverseResult, LocationSearchResult } from '$lib/types/location-search';
import type { PageServerLoad } from './$types';

export type SearchData = {
	streamed: {
		currentLocation: Promise<LocationReverseResult | undefined>;
		searchResults: Promise<LocationSearchResult[]>;
		noSearchResults: Promise<boolean>;
	};
};

export const load: PageServerLoad = async ({ fetch, url }) => {
	const inputValue = url.searchParams.get('input');
	const latParam = url.searchParams.get('lat');
	const lonParam = url.searchParams.get('lon');

	const isCurrentLocation = latParam && lonParam;
	const isSearchLocation = inputValue && inputValue.trim().length > 0;
	const inputCoordinates = isSearchLocation ? parseCoordinates(inputValue) : null;

	const currentLocationResultPromise = isCurrentLocation
		? currentLocationPromise(fetch, [Number(latParam), Number(lonParam)])
		: Promise.resolve(undefined);

	const searchResultsPromise = isSearchLocation
		? inputCoordinates
			? coordinateSearchPromise(fetch, inputCoordinates)
			: searchLocationPromise(fetch, inputValue)
		: Promise.resolve([]);

	let noSearchResultsPromise = Promise.resolve(false);
	if (isCurrentLocation) {
		noSearchResultsPromise = currentLocationResultPromise.then(
			(result) => typeof result === 'object',
		);
	}
	if (isSearchLocation) {
		noSearchResultsPromise = searchResultsPromise.then((results) => results.length === 0);
	}

	return {
		streamed: {
			currentLocation: currentLocationResultPromise,
			searchResults: searchResultsPromise,
			noSearchResults: noSearchResultsPromise,
		},
	};
};

/**
 * Parses a string like "40.7128, -74.0060" or "40.7128 -74.0060" into [lat, lon].
 * Returns null if the input doesn't match a coordinate pattern.
 */
function parseCoordinates(input: string): [number, number] | null {
	const match = input.trim().match(/^(-?\d+(?:\.\d+)?)[,\s]+(-?\d+(?:\.\d+)?)$/);
	if (!match) return null;

	const lat = Number(match[1]);
	const lon = Number(match[2]);

	if (lat < -90 || lat > 90 || lon < -180 || lon > 180) return null;

	return [lat, lon];
}

async function coordinateSearchPromise(
	fetch: Fetch,
	[lat, lon]: [number, number],
): Promise<LocationSearchResult[]> {
	const result = await currentLocationPromise(fetch, [lat, lon]);
	return result ? [result] : [];
}

async function currentLocationPromise(fetch: Fetch, [latParam, lonParam]: [number, number]) {
	const response: Response = await fetchFromSearchApi.reverse({
		fetch,
		locationCoordinates: [latParam, lonParam],
	});
	const dataReverse: ResponseReverse = await response.json();
	return transformResolveData(dataReverse);
}

async function searchLocationPromise(fetch: Fetch, inputValue: string) {
	const response = await fetchFromSearchApi.search({
		fetch,
		locationName: inputValue.trim(),
	});
	const dataSearch: ResponseSearch = await response.json();

	if (!dataSearch || dataSearch.results.length === 0) {
		return [];
	}

	const transformedSearchResults = transformSearchData(dataSearch);

	// Filter out results without city or country information
	const filteredSearchResults = transformedSearchResults.filter(
		(result) =>
			result.city &&
			result.city.trim().length > 0 &&
			result.country &&
			result.country.trim().length > 0,
	);

	return filteredSearchResults;
}
