// src/routes/+page.server.ts
import { getWeatherOverview } from "$lib/services/weather";
import type { MainWeather } from "$lib/types/weather";
import roundMainWeatherValues from "$lib/utilities/round-main-weather";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async function({ fetch }): Promise<MainWeather> {
	try {
		const data = await getWeatherOverview(fetch);
		const dataRounded = roundMainWeatherValues(data);
		return dataRounded
	} catch (e: unknown) {
		console.error("Weather load failed:", e);
		throw error(500, "Failed to load weather data");
	}
}; 
