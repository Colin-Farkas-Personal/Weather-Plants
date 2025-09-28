// src/routes/+page.server.ts
import type { TemperatureUnit } from '$lib/types/temperature';
import type { WeatherOverview } from '$lib/types/weather';
import { toFormattedWeatherData } from '$lib/utilities/formatted-temperature';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import {
	transformWeatherData,
	type ResponseCurrent,
	type ResponseForecast,
} from '$lib/adapters/weatherApiTransformer';
import { fetchFromWeatherApi } from '$lib/adapters/weatherapi';

const selectedRoundValues: boolean = true; // TODO: implement rounding switch
const selectedTemperatureUnit: TemperatureUnit = 'celsius'; // TODO: implement temperature unit selection

export const load: LayoutServerLoad = async ({ params, fetch, setHeaders }) => {
	const location = params.slug;

	try {
		const responseCurrent = await fetchFromWeatherApi.current({ fetch, location });
		const responseForecast = await fetchFromWeatherApi.forecast({ fetch, location });

		// Parse JSON bodies from the Fetch API Response objects
		const dataCurrent: ResponseCurrent = await responseCurrent.json();
		const dataForecast: ResponseForecast = await responseForecast.json();

		// Set headers for caching
		setHeaders({
			'current-age': responseCurrent.headers.get('age') ?? '',
			'current-cache-control': responseCurrent.headers.get('cache-control') ?? '',
			'forecast-age': responseForecast.headers.get('age') ?? '',
			'forecast-cache-control': responseForecast.headers.get('cache-control') ?? '',
		});

		const dataRaw = transformWeatherData(dataCurrent, dataForecast);
		const dataFormatted = toFormattedWeatherData<WeatherOverview>(
			dataRaw,
			selectedTemperatureUnit,
			selectedRoundValues,
		);

		return dataFormatted;
	} catch (e) {
		console.warn('Weather load failed:', e);
		throw error(500, 'Not found');
	}
};
