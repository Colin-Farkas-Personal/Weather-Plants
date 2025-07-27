export type ConditionStatus =
  | 'SUNNY'
  | 'WINDY'
  | 'SUNNY_CLOUDY'
  | 'CLOUDY'
  | 'FOGGY'
  | 'RAINY'
  | 'THUNDER'
  | 'SNOWY'
  | 'FREEZING'
  | 'TORNADO';

export const dayWeatherConditions: string[] = [
  "sunny",
  "partly cloudy",
  "cloudy",
  "overcast",
  "mist",
  "patchy rain possible",
  "patchy snow possible",
  "patchy sleet possible",
  "patchy freezing drizzle possible",
  "thundery outbreaks possible",
  "blowing snow",
  "blizzard",
  "fog",
  "freezing fog",
  "patchy light drizzle",
  "light drizzle",
  "freezing drizzle",
  "heavy freezing drizzle",
  "patchy light rain",
  "light rain",
  "moderate rain at times",
  "moderate rain",
  "heavy rain at times",
  "heavy rain",
  "light freezing rain",
  "moderate or heavy freezing rain",
  "light sleet",
  "moderate or heavy sleet",
  "patchy light snow",
  "light snow",
  "patchy moderate snow",
  "moderate snow",
  "patchy heavy snow",
  "heavy snow",
  "ice pellets",
  "light rain shower",
  "moderate or heavy rain shower",
  "torrential rain shower",
  "light sleet showers",
  "moderate or heavy sleet showers",
  "light snow showers",
  "moderate or heavy snow showers",
  "light showers of ice pellets",
  "moderate or heavy showers of ice pellets",
  "patchy light rain with thunder",
  "moderate or heavy rain with thunder",
  "patchy light snow with thunder",
  "moderate or heavy snow with thunder"
] as const;

export type WeatherCondition = (typeof dayWeatherConditions)[number];

export const nightWeatherConditions: string[] = [
  "Clear",
  "Partly cloudy",
  "Cloudy",
  "Overcast",
  "Mist",
  "Patchy rain possible",
  "Patchy snow possible",
  "Patchy sleet possible",
  "Patchy freezing drizzle possible",
  "Thundery outbreaks possible",
  "Blowing snow",
  "Blizzard",
  "Fog",
  "Freezing fog",
  "Patchy light drizzle",
  "Light drizzle",
  "Freezing drizzle",
  "Heavy freezing drizzle",
  "Patchy light rain",
  "Light rain",
  "Moderate rain at times",
  "Moderate rain",
  "Heavy rain at times",
  "Heavy rain",
  "Light freezing rain",
  "Moderate or heavy freezing rain",
  "Light sleet",
  "Moderate or heavy sleet",
  "Patchy light snow",
  "Light snow",
  "Patchy moderate snow",
  "Moderate snow",
  "Patchy heavy snow",
  "Heavy snow",
  "Ice pellets",
  "Light rain shower",
  "Moderate or heavy rain shower",
  "Torrential rain shower",
  "Light sleet showers",
  "Moderate or heavy sleet showers",
  "Light snow showers",
  "Moderate or heavy snow showers",
  "Light showers of ice pellets",
  "Moderate or heavy showers of ice pellets",
  "Patchy light rain with thunder",
  "Moderate or heavy rain with thunder",
  "Patchy light snow with thunder",
  "Moderate or heavy snow with thunder"
] as const;

export type NightWeatherCondition = (typeof nightWeatherConditions)[number];