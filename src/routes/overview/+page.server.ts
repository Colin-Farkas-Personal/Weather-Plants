import {
	transformWeatherData,
	type ResponseCurrent,
	type ResponseForecast,
	type ResponseTimeZone,
} from '$lib/adapters/weatherApiTransformer';
import { fetchFromWeatherApi } from '$lib/adapters/weatherapi';
import type { Fetch } from '$lib/types/fetch';
import type { TemperatureUnit } from '$lib/types/temperature';
import type { StreamedOverviewData } from '$lib/types/weather';
import { formatTimeToDayTimeHours } from '$lib/utilities/formatted-hours';
import { toFormattedWeatherData } from '$lib/utilities/formatted-temperature';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

const selectedRoundValues: boolean = true; // TODO: implement rounding switch
const selectedTemperatureUnit: TemperatureUnit = 'celsius'; // TODO: implement temperature unit selection

export const load: PageServerLoad = async ({ url, fetch, setHeaders }) => {
	// Read and validate query params
	const lat = getRequiredParam(url, 'lat');
	const lon = getRequiredParam(url, 'lon');
	const name = getRequiredParam(url, 'name');
	const country = getRequiredParam(url, 'country');

	const locationCoordinatesString = `${lat},${lon}`;

	// Cache the page shell so reloads are fast; allow background revalidation
	setHeaders({ 'Cache-Control': 'public, max-age=300, stale-while-revalidate=600' });

	return {
		location: { name, country },
		streamed: { overview: overviewPromise(fetch, locationCoordinatesString) },
	};
};

// Stream the heavy work so the page can render a skeleton immediately
async function overviewPromise(
	fetch: Fetch,
	locationCoordinatesString: string,
): Promise<StreamedOverviewData> {
	try {
		const [resCurrent, resForecast, resTimeZone] = await Promise.all([
			fetchFromWeatherApi.current({ fetch, location: locationCoordinatesString }),
			fetchFromWeatherApi.forecast({ fetch, location: locationCoordinatesString }),
			fetchFromWeatherApi.timeZone({ fetch, location: locationCoordinatesString }),
		]);

		// Guard against upstream failures
		if (!resCurrent.ok || !resForecast.ok || !resTimeZone.ok) {
			console.error('Upstream weather error', {
				currentStatus: resCurrent.status,
				forecastStatus: resForecast.status,
				timeZoneStatus: resTimeZone.status,
			});
			throw error(502, 'Upstream weather service failed');
		}

		const [dataCurrent, dataForecast, dataTimeZone] = await Promise.all([
			resCurrent.json() as Promise<ResponseCurrent>,
			resForecast.json() as Promise<ResponseForecast>,
			resTimeZone.json() as Promise<ResponseTimeZone>,
		]);

		return formatOverview(dataCurrent, dataForecast, dataTimeZone);
	} catch (e) {
		console.error('Weather load failed:', e);
		throw error(500, 'Unable to load weather');
	}
}

const formatOverview = (
	current: ResponseCurrent,
	forecast: ResponseForecast,
	timeZone: ResponseTimeZone,
): StreamedOverviewData => {
	const raw = transformWeatherData(current, forecast, timeZone);
	const formattedTime = formatTimeToDayTimeHours(raw);
	return toFormattedWeatherData<StreamedOverviewData>(
		formattedTime,
		selectedTemperatureUnit,
		selectedRoundValues,
	);
};

const getRequiredParam = (url: URL, key: string) => {
	const value = url.searchParams.get(key);
	if (!value) throw error(400, `Missing required query param: ${key}`);
	return value;
};
