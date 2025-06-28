import type { MainWeather } from "$lib/types/weather";

const WEATHER_API_URL = "https://api.weatherapi.com/v1/forecast.json";
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;


function getFetchUrl() {
    const city = "London";
    const days = 1;

    const parameters = new URLSearchParams({
        key: WEATHER_API_KEY,
        q: city,
        days: days.toString(),
    }).toString();

    return WEATHER_API_URL + "?" + parameters;
}


type Fetch = typeof fetch
export async function getWeatherOverview(fetch: Fetch): Promise<MainWeather> {    
    const fetchUrl = getFetchUrl();
    const response = await fetch(fetchUrl);

    if (!response.ok) {
        throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();

    return {
        location: {
            name: data.location.name,
            country: data.location.country
        },
        temperature: data.current.temp_c,
        feelsLike: data.current.feelslike_c,
        condition: {
            text: data.current.condition.text,
            code: data.current.condition.code
        },
        dailyRange: {
            min: data.forecast.forecastday[0].day.mintemp_c,
            max: data.forecast.forecastday[0].day.maxtemp_c
        }
    };
}; 