import type { LocationSearchResult } from '$lib/types/location-search';
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
	id: number;
	name: string;
	region: string;
	country: string;
};
function transformSearchData(responseSearch: ResponseSearch[]): LocationSearchResult[] {
	const transformedData: LocationSearchResult[] = [];

	responseSearch.forEach((result: ResponseSearch) => {
		transformedData.push({
			id: result.id,
			name: result.name,
			region: result.region,
			country: result.country,
		});
	});

	return transformedData;
}

function transformCurrentLocationData(responseSearch: ResponseSearch): LocationSearchResult {
	const transformedData: LocationSearchResult = {
		id: responseSearch.id,
		name: responseSearch.name,
		region: responseSearch.region,
		country: responseSearch.country,
	};

	return transformedData;
}

export { transformWeatherData, transformSearchData, transformCurrentLocationData };
