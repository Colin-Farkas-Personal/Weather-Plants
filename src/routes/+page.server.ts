// src/routes/+page.server.ts
import { getWeatherOverview } from "$lib/services/weather";
import type { MainWeather } from "$lib/types/weather";
import toTemperatureString from "$lib/utilities/to-temperature-string";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async function({ fetch }): Promise<MainWeather> {
	try {
		const data = await getWeatherOverview(fetch);
		const dataRounded = toTemperatureString(data, 'celsius') as unknown as MainWeather;
		
		return dataRounded;
	} catch (e: unknown) {
		console.error("Weather load failed:", e);
		throw error(500, "Failed to load weather data");
	}
}; 
