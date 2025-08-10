import type { WeatherOverviewRaw } from "$lib/types/weather";

async function transformWeatherData(response: Response): Promise<WeatherOverviewRaw> {
  const data = await response.json();

  return {
    location: {
      name: data.location.name,
      country: data.location.country,
    },
    temperature_tempC: data.current.temp_c,
    feelsLike_tempC: data.current.feelslike_c,
    condition: {
      text: data.current.condition.text,
      code: data.current.condition.code,
    },
    dailyRange: {
      min_tempC: data.forecast.forecastday[0].day.mintemp_c,
      max_tempC: data.forecast.forecastday[0].day.maxtemp_c,
    },
    lastUpdated: data.current.last_updated,
  };
}

export { transformWeatherData };
