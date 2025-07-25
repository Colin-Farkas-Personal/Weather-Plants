<script lang="ts">
	import { temperatureTheme } from '$lib/globals/temperatureThemeStore.svelte.js';
	import '$lib/styles/styles.scss';
	import type { TemperatureRange } from '$lib/types/temperature.js';
	import { temperatureToRange } from '$lib/utilities/temperature-to-range';
	import { onMount } from 'svelte';

	let { data, children } = $props();

	temperatureTheme.set(temperatureToRange(data.temperature));

	onMount(() => {
		const unsubscribe = temperatureTheme.subscribe((t) => {
			if (t) {
				setThemeAttributeName(t as TemperatureRange);
			}
		});

		return () => {
			unsubscribe;
		}
	})

	function setThemeAttributeName(theme: TemperatureRange) {
		document.documentElement.setAttribute('data-theme', theme.toLowerCase());
	}
</script>

{@render children?.()}
