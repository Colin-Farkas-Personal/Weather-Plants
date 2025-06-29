import type { MainWeather } from "$lib/types/weather";

export default function roundMainWeatherValues(mainWeather: MainWeather): MainWeather {
    return {
        ...mainWeather,
        temperature: Math.round(mainWeather.temperature),
        feelsLike: Math.round(mainWeather.feelsLike),
        dailyRange: {
            min: Math.round(mainWeather.dailyRange.min),
            max: Math.round(mainWeather.dailyRange.max)
        },
    };
}