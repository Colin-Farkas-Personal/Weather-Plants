<script lang="ts">
	import CloudLigtningBold from '$lib/components/Icons/CloudLigtningBold.svelte';
	import { type WeatherCondition } from '$lib/types/weather-condition';
	import { onMount, type Component } from 'svelte';

	let { condition }: { condition: WeatherCondition } = $props();
	let WeatherConditionIcon: Record<WeatherCondition, Component> = {
		Clear: CloudLigtningBold,
		'Partly cloudy': CloudLigtningBold,
		Cloudy: CloudLigtningBold,
		Overcast: CloudLigtningBold,
		'Light rain': CloudLigtningBold,
		'Moderate rain': CloudLigtningBold,
		'Heavy rain': CloudLigtningBold,
		'Light snow': CloudLigtningBold,
		'Moderate snow': CloudLigtningBold,
		'Heavy snow': CloudLigtningBold,
		Thunderstorm: CloudLigtningBold
	};

	let Icon: Component = WeatherConditionIcon[condition] || false;
</script>

<Icon />
