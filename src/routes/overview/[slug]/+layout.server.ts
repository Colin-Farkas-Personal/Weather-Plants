// src/routes/+page.server.ts
import type { TemperatureUnit } from "$lib/types/temperature";
import type { WeatherOverview } from "$lib/types/weather";
import { toFormattedWeatherData } from "$lib/utilities/formatted-temperature";
import { error } from "@sveltejs/kit";
import { fetchFromWeatherApi } from "$lib/adapters/weatherapi";
import type { Fetch } from "$lib/types/fetch";

const selectedTemperatureUnit: TemperatureUnit = 'celsius';
// const WEATHER_API_LOCATION_CITY = 'Gothenburg'; // Default city while testing

interface LoadParams {
	params: { slug: string };
	fetch: Fetch;
}
export async function load({ params, fetch }: LoadParams): Promise<WeatherOverview> {
	const location = params.slug;
	console.warn("LOCATION: ", location);

	try {
		const data = await fetchFromWeatherApi(fetch, location);
		console.error("DATA:", data);
		const dataFormatted = toFormattedWeatherData<WeatherOverview>(data, selectedTemperatureUnit, true);
		
		return dataFormatted;
	} catch (e: unknown) {
		console.error("Weather load failed:", e);
		throw error(500, "Failed to load weather data");
	}
}; 
