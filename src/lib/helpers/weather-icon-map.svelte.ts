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
  Clear: SunBold,
  Sunny: SunBold,
  'Partly cloudy': CloudSunBold,
  Cloudy: CloudBold,
  Overcast: CloudBold,
  Mist: CloudFogBold,
  'Patchy rain possible': CloudRainBold,
  'Patchy snow possible': CloudSnowBold,
  'Patchy sleet possible': CloudBold,
  'Patchy freezing drizzle possible': CloudBold,
  'Thundery outbreaks possible': CloudLigtningBold,
  'Blowing snow': CloudSnowBold,
  Blizzard: CloudSnowBold,
  Fog: CloudFogBold,
  'Freezing fog': CloudFogBold,
  'Patchy light drizzle': CloudRainBold,
  'Light drizzle': CloudRainBold,
  'Freezing drizzle': CloudSnowBold,
  'Heavy freezing drizzle': CloudSnowBold,
  'Patchy light rain': CloudRainBold,
  'Light rain': CloudRainBold,
  'Moderate rain at times': CloudRainBold,
  'Moderate rain': CloudRainBold,
  'Heavy rain at times': CloudRainBold,
  'Heavy rain': CloudRainBold,
  'Light freezing rain': CloudRainBold,
  'Moderate or heavy freezing rain': CloudRainBold,
  'Light sleet': CloudBold,
  'Moderate or heavy sleet': CloudBold,
  'Patchy light snow': CloudBold,
  'Light snow': CloudSnowBold,
  'Patchy moderate snow': CloudSnowBold,
  'Moderate snow': CloudSnowBold,
  'Patchy heavy snow': CloudSnowBold,
  'Heavy snow': CloudSnowBold,
  'Ice pellets': SnowflakeBold,
  'Light rain shower': CloudRainBold,
  'Moderate or heavy rain shower': CloudRainBold,
  'Torrential rain shower': CloudRainBold,
  'Light sleet showers': CloudRainBold,
  'Moderate or heavy sleet showers': CloudRainBold,
  'Light snow showers': CloudSnowBold,
  'Moderate or heavy snow showers': CloudSnowBold,
  'Light showers of ice pellets': CloudSnowBold,
  'Moderate or heavy showers of ice pellets': CloudSnowBold,
  'Patchy light rain with thunder': CloudLigtningBold,
  'Moderate or heavy rain with thunder': CloudLigtningBold,
  'Patchy light snow with thunder': CloudLigtningBold,
  'Moderate or heavy snow with thunder': CloudLigtningBold,
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