// src/routes/+page.server.ts
import { getWeatherOverview } from "$lib/services/weather";
import type { MainWeather } from "$lib/types/weather";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async function({ fetch }): Promise<MainWeather> {
	try {
		return await getWeatherOverview(fetch);
	} catch (e: unknown) {
		console.error("Weather load failed:", e);
		throw error(500, "Failed to load weather data");
	}
}; 
