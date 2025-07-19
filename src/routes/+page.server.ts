// src/routes/+page.server.ts
import { getWeatherOverview } from "$lib/services/weather";
import type { TemperatureUnit } from "$lib/types/temperature";
import type { WeatherOverview } from "$lib/types/weather";
import { toFormattedWeatherData } from "$lib/utilities/to-formatted-weather-data";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

const selectedTemperatureUnit: TemperatureUnit = 'celsius';

export const load: PageServerLoad = async function({ fetch }): Promise<WeatherOverview> {
	try {
		const data = await getWeatherOverview(fetch);
		const dataFormatted = toFormattedWeatherData<WeatherOverview>(data, selectedTemperatureUnit, true);
		
		console.log(" --- OBJECT --- ", dataFormatted)
		return dataFormatted;
	} catch (e: unknown) {
		console.error("Weather load failed:", e);
		throw error(500, "Failed to load weather data");
	}
}; 
