<script lang="ts">
	import DesktopOverview from '$lib/components/Pages/DesktopOverview.svelte';
	import MobileOverview from '$lib/components/Pages/MobileOverview.svelte';
	import { windowOrientation } from '$lib/globals/windowStore';
	import type { WeatherOverview } from '$lib/types/weather.js';
	import type { WindowOrientation } from '$lib/types/window';
	import { onDestroy } from 'svelte';

	// Props
	interface PageProps {
		data: WeatherOverview;
	}
	let { data }: PageProps = $props();

	// Logic
	let _orientation = $state<WindowOrientation>('portrait');

	let unsubscribe = windowOrientation.subscribe((orientation) => _orientation = orientation);

	onDestroy(unsubscribe);
</script>

<article class="overview">
	{#if _orientation === 'landscape'}
		<DesktopOverview {data} />
	{:else if _orientation === 'portrait'}
		<MobileOverview {data} />
	{/if}
</article>
