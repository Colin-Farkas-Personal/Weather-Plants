import { fetchFromWeatherApi } from "$lib/adapters/weatherapi";
import type { Fetch } from "$lib/types/fetch";
import type { MainWeather } from "$lib/types/weather";

export const WEATHER_API_LOCATION_CITY = "London"; // Default city while testing

export async function getWeatherOverview(fetch: Fetch, location: string = WEATHER_API_LOCATION_CITY): Promise<MainWeather> {
    return fetchFromWeatherApi(fetch, location)
}