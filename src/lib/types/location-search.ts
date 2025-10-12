type LocationSearchResult = {
	id: number;
	lon: number;
	lat: number;
	country: string;
	county: string;
	city: string;
};
type LocationReverseResult = LocationSearchResult;

export type { LocationSearchResult, LocationReverseResult };
