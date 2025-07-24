import type { WeatherCondition } from '$lib/types/weather-condition';
import type { Component } from 'svelte';
import SunBold from '$lib/components/Icon/Bold/SunBold.svelte';
import CloudSunBold from '$lib/components/Icon/Bold/CloudSunBold.svelte';
import CloudBold from '$lib/components/Icon/Bold/CloudBold.svelte';
import CloudFogBold from '$lib/components/Icon/Bold/CloudFogBold.svelte';
import CloudRainBold from '$lib/components/Icon/Bold/CloudRainBold.svelte';
import CloudSnowBold from '$lib/components/Icon/Bold/CloudSnowBold.svelte';
import CloudLigtningBold from '$lib/components/Icon/Bold/CloudLigtningBold.svelte';
import SnowflakeBold from '$lib/components/Icon/Bold/SnowflakeBold.svelte';

const weatherConditionIcons: Record<WeatherCondition, Component> = {
  'Blowing snow': CloudSnowBold,
  'Freezing drizzle': CloudSnowBold,
  'Freezing fog': CloudFogBold,
  'Heavy freezing drizzle': CloudSnowBold,
  'Heavy rain at times': CloudRainBold,
  'Heavy rain': CloudRainBold,
  'Heavy snow': CloudSnowBold,
  'Ice pellets': SnowflakeBold,
  'Light drizzle': CloudRainBold,
  'Light freezing rain': CloudRainBold,
  'Light rain shower': CloudRainBold,
  'Light rain': CloudRainBold,
  'Light showers of ice pellets': CloudSnowBold,
  'Light sleet showers': CloudRainBold,
  'Light sleet': CloudBold,
  'Light snow showers': CloudSnowBold,
  'Light snow': CloudSnowBold,
  'Moderate or heavy freezing rain': CloudRainBold,
  'Moderate or heavy rain shower': CloudRainBold,
  'Moderate or heavy rain with thunder': CloudLigtningBold,
  'Moderate or heavy showers of ice pellets': CloudSnowBold,
  'Moderate or heavy sleet showers': CloudRainBold,
  'Moderate or heavy sleet': CloudBold,
  'Moderate or heavy snow showers': CloudSnowBold,
  'Moderate or heavy snow with thunder': CloudLigtningBold,
  'Moderate rain at times': CloudRainBold,
  'Moderate rain': CloudRainBold,
  'Moderate snow': CloudSnowBold,
  'Partly Cloudy': CloudSunBold,
  'Partly cloudy': CloudSunBold,
  'Patchy freezing drizzle possible': CloudBold,
  'Patchy heavy snow': CloudSnowBold,
  'Patchy light drizzle': CloudRainBold,
  'Patchy light rain with thunder': CloudLigtningBold,
  'Patchy light rain': CloudRainBold,
  'Patchy light snow with thunder': CloudLigtningBold,
  'Patchy light snow': CloudBold,
  'Patchy moderate snow': CloudSnowBold,
  'Patchy rain possible': CloudRainBold,
  'Patchy sleet possible': CloudBold,
  'Patchy snow possible': CloudSnowBold,
  'Thundery outbreaks possible': CloudLigtningBold,
  'Torrential rain shower': CloudRainBold,
  Blizzard: CloudSnowBold,
  Clear: SunBold,
  Cloudy: CloudBold,
  Fog: CloudFogBold,
  Mist: CloudFogBold,
  Overcast: CloudBold,
  Sunny: SunBold,
};

function getWeatherIcon(condition: WeatherCondition): Component | null {
  const icon = weatherConditionIcons[condition];

  if (!icon) {
    console.warn(`No icon found for weather condition: ${condition}`);
    return null;
  }

  return icon; 
}

export { weatherConditionIcons, getWeatherIcon };