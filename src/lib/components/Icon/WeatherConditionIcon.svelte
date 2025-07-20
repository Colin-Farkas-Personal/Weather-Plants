<script lang="ts">
	import type { WeatherCondition } from "$lib/types/weather-condition";
	import type { Component } from "svelte";
	import { getWeatherIcon } from "./weather-icon-map.svelte";

	// Props
	let { condition }: { condition: WeatherCondition } = $props();

	// Logic
	let Icon = getWeatherIcon(condition);
</script>

{#if Icon}<Icon />{/if}
