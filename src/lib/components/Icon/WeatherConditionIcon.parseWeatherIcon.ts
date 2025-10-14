import CloudBold from '~icons/ph/cloud-bold';
import CloudFogBold from '~icons/ph/cloud-fog-bold';
import CloudLightningBold from '~icons/ph/cloud-lightning-bold';
import CloudRainBold from '~icons/ph/cloud-rain-bold';
import CloudSnowBold from '~icons/ph/cloud-snow-bold';
import CloudSunBold from '~icons/ph/cloud-sun-bold';
import SnowflakeBold from '~icons/ph/snowflake-bold';
import SunBold from '~icons/ph/sun-bold';
import TornadoBold from '~icons/ph/tornado-bold';
import WindBold from '~icons/ph/wind-bold';
import type { ConditionStatus } from '$lib/types/condition';
import type { Component } from 'svelte';

const weatherConditionIcons: Record<ConditionStatus, Component> = {
	SUNNY: SunBold,
	WINDY: WindBold,
	SUNNY_CLOUDY: CloudSunBold,
	CLOUDY: CloudBold,
	FOGGY: CloudFogBold,
	RAINY: CloudRainBold,
	THUNDER: CloudLightningBold,
	SNOWY: CloudSnowBold,
	FREEZING: SnowflakeBold,
	TORNADO: TornadoBold,
};

function parseWeatherIcon(condition: ConditionStatus): Component | null {
	const icon = weatherConditionIcons[condition];

	return icon;
}

export { parseWeatherIcon, weatherConditionIcons };
