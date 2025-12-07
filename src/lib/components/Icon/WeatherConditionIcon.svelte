<script lang="ts">
	import { type CurrentCondition } from '$lib/globals/conditionStatusStore.svelte';
	import { parseWeatherIcon } from './WeatherConditionIcon.parseWeatherIcon';

	// Props
	interface WeatherConditionIconProps {
		conditionStatus: CurrentCondition['status'];
	}

	let { conditionStatus }: WeatherConditionIconProps = $props();

	// State
	let Icon = parseWeatherIcon(conditionStatus);
</script>

{#if Icon}<Icon />{/if}
