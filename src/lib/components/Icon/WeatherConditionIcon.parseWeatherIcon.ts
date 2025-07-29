import CloudBold from '$lib/components/Icon/Bold/CloudBold.svelte';
import CloudFogBold from '$lib/components/Icon/Bold/CloudFogBold.svelte';
import CloudLigtningBold from '$lib/components/Icon/Bold/CloudLigtningBold.svelte';
import CloudRainBold from '$lib/components/Icon/Bold/CloudRainBold.svelte';
import CloudSnowBold from '$lib/components/Icon/Bold/CloudSnowBold.svelte';
import CloudSunBold from '$lib/components/Icon/Bold/CloudSunBold.svelte';
import SnowflakeBold from '$lib/components/Icon/Bold/SnowflakeBold.svelte';
import SunBold from '$lib/components/Icon/Bold/SunBold.svelte';
import TornadoBold from '$lib/components/Icon/Bold/TornadoBold.svelte';
import WindBold from '$lib/components/Icon/Bold/WindBold.svelte';
import type { ConditionStatus } from '$lib/types/condition';
import type { Component } from 'svelte';

const weatherConditionIcons: Record<ConditionStatus, Component> = {
  SUNNY: SunBold,
  WINDY: WindBold,
  SUNNY_CLOUDY: CloudSunBold,
  CLOUDY: CloudBold,
  FOGGY: CloudFogBold,
  RAINY: CloudRainBold,
  THUNDER: CloudLigtningBold,
  SNOWY: CloudSnowBold,
  FREEZING: SnowflakeBold,
  TORNADO: TornadoBold,
};

function parseWeatherIcon(condition: ConditionStatus): Component | null {
  const icon = weatherConditionIcons[condition];

  return icon;
}

export { parseWeatherIcon, weatherConditionIcons };

