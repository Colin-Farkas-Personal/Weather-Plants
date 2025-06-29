
export const WEATHER_API_URL = "https://api.weatherapi.com/v1/forecast.json";
export const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
export const WEATHER_API_DAYS = 1;

export function getFetchUrl(apiKey: string, location: string, days: number): string {
    const parameters = new URLSearchParams({
        key: apiKey,
        q: location,
        days: days.toString(),
    }).toString();

    return WEATHER_API_URL + "?" + parameters;
}


type Fetch = typeof fetch
export async function fetchFromWeatherApi(fetch: Fetch, location: string) {    
    const fetchUrl = getFetchUrl(WEATHER_API_KEY, location, WEATHER_API_DAYS);
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
        temperature_c: data.current.temp_c,
        feelsLike_c: data.current.feelslike_c,
        condition: {
            text: data.current.condition.text,
            code: data.current.condition.code
        },
        dailyRange: {
            min_c: data.forecast.forecastday[0].day.mintemp_c,
            max_c: data.forecast.forecastday[0].day.maxtemp_c
        },
        lastUpdated: data.current.last_updated
    };
}; 