import { fetchFromWeatherApi } from '$lib/adapters/weatherapi';
import type { Fetch } from '$lib/types/fetch';

export const WEATHER_API_LOCATION_CITY = 'London'; // Default city while testing

export async function getWeatherOverview(
  fetch: Fetch,
  location: string = WEATHER_API_LOCATION_CITY
) {
  return fetchFromWeatherApi(fetch, location);
}
