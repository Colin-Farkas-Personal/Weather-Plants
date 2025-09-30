<script lang="ts">
	import conditionStatusStore from '$lib/globals/conditionStatusStore.svelte.js';
	import temperatureRangeStore from '$lib/globals/temperatureRangeStore.svelte.js';
	import type { TemperatureRange } from '$lib/types/temperature.js';
	import { onMount } from 'svelte';

	let { data, children } = $props();

	temperatureRangeStore.setRange(data.temperature);
	conditionStatusStore.setCondition(data.condition.text);

	onMount(() => {
		setThemeAttributeName($temperatureRangeStore as TemperatureRange);
	});

	function setThemeAttributeName(theme: TemperatureRange | 'default') {
		document.documentElement.setAttribute('data-theme', theme.toLowerCase());
	}
</script>

{@render children?.()}
