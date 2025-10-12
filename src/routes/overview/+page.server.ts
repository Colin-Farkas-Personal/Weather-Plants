import {
	transformWeatherData,
	type ResponseCurrent,
	type ResponseForecast,
} from '$lib/adapters/weatherApiTransformer';
import { fetchFromWeatherApi } from '$lib/adapters/weatherapi';
import type { TemperatureUnit } from '$lib/types/temperature';
import type { WeatherOverview } from '$lib/types/weather';
import { toFormattedWeatherData } from '$lib/utilities/formatted-temperature';
import { error } from '@sveltejs/kit';

const selectedRoundValues: boolean = true; // TODO: implement rounding switch
const selectedTemperatureUnit: TemperatureUnit = 'celsius'; // TODO: implement temperature unit selection

export const load = async ({ url, fetch, setHeaders }) => {
	// Example url: http://localhost:5173/overview?lat=-22.9110137&lon=-43.2093727&name=Rio+de+Janeiro&country=Brazil
	const lat = url.searchParams.get('lat');
	const lon = url.searchParams.get('lon');
	const name = url.searchParams.get('name');
	const country = url.searchParams.get('country');

	if (!lat || !lon || !name || !country) {
		throw error(400, 'Latitude, longitude, name, and country are required');
	}

	const locationCoordinatesString = `${lat},${lon}`;

	try {
		const responseCurrent = await fetchFromWeatherApi.current({
			fetch,
			location: locationCoordinatesString,
		});
		const responseForecast = await fetchFromWeatherApi.forecast({
			fetch,
			location: locationCoordinatesString,
		});

		const dataCurrent: ResponseCurrent = await responseCurrent.json();
		const dataForecast: ResponseForecast = await responseForecast.json();

		setHeaders({
			'current-age': responseCurrent.headers.get('age') ?? '',
			'current-cache-control': responseCurrent.headers.get('cache-control') ?? '',
			'forecast-age': responseForecast.headers.get('age') ?? '',
			'forecast-cache-control': responseForecast.headers.get('cache-control') ?? '',
		});

		const dataRaw = transformWeatherData(dataCurrent, dataForecast, { name, country });
		const dataFormatted = toFormattedWeatherData<WeatherOverview>(
			dataRaw,
			selectedTemperatureUnit,
			selectedRoundValues,
		);

		return dataFormatted;
	} catch (e) {
		console.warn(
			'Loading weather for location coordinates:',
			locationCoordinatesString,
			name,
			country,
		);
		console.warn('Weather load failed:', e);
		throw error(500, 'Unable to load weather');
	}
};
