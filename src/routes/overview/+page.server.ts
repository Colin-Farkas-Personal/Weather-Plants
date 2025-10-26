import {
	transformWeatherData,
	type ResponseCurrent,
	type ResponseForecast,
} from '$lib/adapters/weatherApiTransformer';
import { fetchFromWeatherApi } from '$lib/adapters/weatherapi';
import type { TemperatureUnit } from '$lib/types/temperature';
import type { StreamedOverviewData } from '$lib/types/weather';
import { toFormattedWeatherData } from '$lib/utilities/formatted-temperature';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

const selectedRoundValues: boolean = true; // TODO: implement rounding switch
const selectedTemperatureUnit: TemperatureUnit = 'celsius'; // TODO: implement temperature unit selection

export const load: PageServerLoad = async ({ url, fetch }) => {
	// Example url: http://localhost:5173/overview?lat=-22.9110137&lon=-43.2093727&name=Rio+de+Janeiro&country=Brazil
	const lat = url.searchParams.get('lat');
	const lon = url.searchParams.get('lon');
	const name = url.searchParams.get('name');
	const country = url.searchParams.get('country');

	if (!lat || !lon || !name || !country) {
		throw error(400, 'Latitude, longitude, name, and country are required');
	}

	const locationCoordinatesString = `${lat},${lon}`;

	// render a skeleton while this resolves.
	const overviewPromise = (async () => {
		try {
			const [responseCurrent, responseForecast] = await Promise.all([
				fetchFromWeatherApi.current({ fetch, location: locationCoordinatesString }),
				fetchFromWeatherApi.forecast({ fetch, location: locationCoordinatesString }),
			]);

			const [dataCurrent, dataForecast] = await Promise.all([
				responseCurrent.json() as Promise<ResponseCurrent>,
				responseForecast.json() as Promise<ResponseForecast>,
			]);

			const dataRaw = transformWeatherData(dataCurrent, dataForecast);
			const dataFormatted = toFormattedWeatherData<StreamedOverviewData>(
				dataRaw,
				selectedTemperatureUnit,
				selectedRoundValues,
			);

			return dataFormatted;
		} catch (e) {
			console.warn('Weather load failed:', e);
			throw error(500, 'Unable to load weather');
		}
	})();

	return {
		// Any instantly-available bits you might want to show before the streamed data arrives
		location: { name, country },

		// Values under `streamed` are delivered after the first render.
		streamed: {
			overview: overviewPromise,
		},
	};
};
