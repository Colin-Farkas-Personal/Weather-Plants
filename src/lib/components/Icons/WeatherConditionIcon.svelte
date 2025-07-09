<script module lang="ts">
	export const weatherConditionIcons: Record<WeatherCondition, Component> = {
		'Clear': SunBold,
		'Partly Cloudy': CloudSunBold,
		Cloudy: CloudBold,
		Overcast: CloudBold,
		Fog: CloudFogBold,
		'Freezing fog': CloudFogBold,
		'Patchy light rain with thunder': CloudLigtningBold,
		'Moderate or heavy rain with thunder': CloudLigtningBold,
		'Patchy light snow with thunder': CloudLigtningBold,
		'Moderate or heavy snow with thunder': CloudLigtningBold
	};
</script>

<script lang="ts">
	import CloudSunBold from './Bold/CloudSunBold.svelte';
	import { type WeatherCondition } from '$lib/types/weather-condition';
	import { type Component } from 'svelte';
	import CloudBold from './Bold/CloudBold.svelte';
	import CloudLigtningBold from './Bold/CloudLigtningBold.svelte';
	import CloudFogBold from './Bold/CloudFogBold.svelte';
	import SunBold from './Bold/SunBold.svelte';

	// Props
	let { condition }: { condition: WeatherCondition } = $props();

	// Logic
	let Icon: Component = weatherConditionIcons[condition] || null;
</script>

{#if Icon}<Icon />{/if}
