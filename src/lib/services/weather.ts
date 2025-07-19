import { fetchFromWeatherApi } from '$lib/adapters/weatherapi';
import type { Fetch } from '$lib/types/fetch';
import type { WeatherOverviewRaw } from '$lib/types/weather';

export const WEATHER_API_LOCATION_CITY = 'London'; // Default city while testing

export async function getWeatherOverview(
  fetch: Fetch,
  location: string = WEATHER_API_LOCATION_CITY
) {
  const weatherData = await fetchFromWeatherApi(fetch, location);

  if (!weatherData) {
    throw new Error('No weather data returned from API');
  }

  const weatherDataRaw: WeatherOverviewRaw = {
    location: {
      name: weatherData.location.name ,
      country: weatherData.location.country
    },
    temperature_tempC: weatherData.temperature_c,
    feelsLike_tempC: weatherData.feelsLike_c,
    condition: {
      text: weatherData.condition.text,
      code: weatherData.condition.code
    },
    dailyRange: {
      min_tempC: weatherData.dailyRange.min_c,
      max_tempC: weatherData.dailyRange.max_c
    },
    lastUpdated: weatherData.lastUpdated,
  }
  
  return weatherDataRaw;
}
