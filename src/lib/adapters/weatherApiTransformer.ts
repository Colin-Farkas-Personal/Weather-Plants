import type { LocationReverseResult, LocationSearchResult } from '$lib/types/location-search';
import type { WeatherOverviewRaw } from '$lib/types/weather';

export type ResponseCurrent = {
	location: {
		name: string;
		country: string;
	};
	current: {
		last_updated: string;
		temp_c: number;
		condition: {
			text: string;
			code: number;
		};
		feelslike_c: number;
	};
};
export type ResponseForecast = {
	location: {
		name: string;
		country: string;
	};
	forecast: {
		forecastday: Array<{
			day: {
				mintemp_c: number;
				maxtemp_c: number;
			};
		}>;
	};
};
function transformWeatherData(
	responseCurrent: ResponseCurrent,
	responseForecast: ResponseForecast,
): WeatherOverviewRaw {
	return {
		location: {
			name: responseCurrent.location.name,
			country: responseCurrent.location.country,
		},
		temperature_tempC: responseCurrent.current.temp_c,
		feelsLike_tempC: responseCurrent.current.feelslike_c,
		condition: {
			text: responseCurrent.current.condition.text,
			code: responseCurrent.current.condition.code,
		},
		dailyRange: {
			min_tempC: responseForecast.forecast.forecastday[0].day.mintemp_c,
			max_tempC: responseForecast.forecast.forecastday[0].day.maxtemp_c,
		},
		lastUpdated: responseCurrent.current.last_updated,
	};
}

export type ResponseSearch = {
	results: Array<{
		place_id: number;
		lon: number;
		lat: number;
		country: string;
		county: string;
		city: string;
	}>;
};
function transformSearchData(responseSearch: ResponseSearch): LocationSearchResult[] {
	const transformedData: LocationSearchResult[] = [];

	responseSearch.results.forEach((result) => {
		transformedData.push({
			id: result.place_id,
			lon: result.lon,
			lat: result.lat,
			country: result.country,
			county: result.county,
			city: result.city,
		});
	});

	return transformedData;
}

export type ResponseReverse = {
	results: Array<{
		place_id: number;
		lon: number;
		lat: number;
		country: string;
		county: string;
		city: string;
	}>;
};
function transformReverseData(responseResolve: ResponseReverse): LocationReverseResult {
	return {
		id: responseResolve.results[0].place_id,
		lon: responseResolve.results[0].lon,
		lat: responseResolve.results[0].lat,
		country: responseResolve.results[0].country,
		county: responseResolve.results[0].county,
		city: responseResolve.results[0].city,
	};
}

export { transformWeatherData, transformSearchData, transformReverseData as transformResolveData };
