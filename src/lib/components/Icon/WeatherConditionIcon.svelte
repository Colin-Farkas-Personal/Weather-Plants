<script lang="ts">
	import conditionStatusStore from "$lib/globals/conditionStatusStore.svelte";
	import type { ConditionStatus, WeatherCondition } from "$lib/types/condition";
	import { onMount, type Component } from "svelte";
	import { parseWeatherIcon } from "./WeatherConditionIcon.parseWeatherIcon";

	// Props
	let Icon = $state<Component | null>();

	// Logic
	onMount(() => {
		const unsubscribe = conditionStatusStore.subscribe(s => {
			if (s) {
				Icon = parseWeatherIcon(s);
			}
		})

		return () => {
			unsubscribe;
		}
	});
</script>

{#if Icon}<Icon />{/if}
