<script lang="ts">
	import { getWeatherIcon } from "$lib/helpers/weather-icon-map.svelte";
	import type { WeatherCondition } from "$lib/types/weather-condition";
	import type { Component } from "svelte";

	// Props
	let { condition }: { condition: WeatherCondition } = $props();

	// Logic
	let Icon = getWeatherIcon(condition);
</script>

{#if Icon}<Icon />{/if}
