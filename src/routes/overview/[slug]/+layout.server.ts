// src/routes/+page.server.ts
import type { TemperatureUnit } from "$lib/types/temperature";
import type { WeatherOverview } from "$lib/types/weather";
import { toFormattedWeatherData } from "$lib/utilities/formatted-temperature";
import { error } from "@sveltejs/kit";
import { fetchFromWeatherApi } from "$lib/adapters/weatherapi";
import type { LayoutServerLoad } from './$types';
import { transformWeatherData } from "$lib/adapters/weatherapi.transformer";

const selectedRoundValues: boolean = true; // TODO: implement rounding switch
const selectedTemperatureUnit: TemperatureUnit = 'celsius'; // TODO: implement temperature unit selection

export const load: LayoutServerLoad = async ({ params, fetch, setHeaders }) => {
	const location = params.slug;

	try {
		const response = await fetchFromWeatherApi({ fetch, location });
		
		// Set headers for caching
		setHeaders({
			age: response.headers.get('age') ?? '',
			'cache-control': response.headers.get('cache-control') ?? '',
		});

		const dataRaw = await transformWeatherData(response);
		const dataFormatted = toFormattedWeatherData<WeatherOverview>(
			dataRaw,
			selectedTemperatureUnit,
			selectedRoundValues
		);

		return dataFormatted;
	} catch (e) {
		console.warn('Weather load failed:', e);
		throw error(500, 'Not found');
	}
};