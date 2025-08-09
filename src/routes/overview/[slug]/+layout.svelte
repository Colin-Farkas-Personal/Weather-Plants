<script lang="ts">
	import conditionStatusStore from '$lib/globals/conditionStatusStore.svelte.js';
	import temperatureThemeStore from '$lib/globals/temperatureThemeStore.svelte.js';
	import '$lib/styles/styles.scss';
	import type { TemperatureRange } from '$lib/types/temperature.js';
	import { onMount } from 'svelte';

	let { data, children } = $props();

	temperatureThemeStore.setTheme(data.temperature);
	conditionStatusStore.setCondition(data.condition.text);

	onMount(() => {
		const unsubscribeTheme = temperatureThemeStore.subscribe((t) => {
			if (t) {
				setThemeAttributeName(t as TemperatureRange);
			}
		});

		return () => {
			unsubscribeTheme;
		}
	})

	function setThemeAttributeName(theme: TemperatureRange) {
		document.documentElement.setAttribute('data-theme', theme.toLowerCase());
	}
</script>

{@render children?.()}
