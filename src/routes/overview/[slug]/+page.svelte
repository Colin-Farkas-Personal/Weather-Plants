<script lang="ts">
	import DesktopOverview from '$lib/components/Pages/DesktopOverview.svelte';
	import MobileOverview from '$lib/components/Pages/MobileOverview.svelte';
	import { windowOrientation } from '$lib/globals/windowStore';
	import type { WeatherOverview } from '$lib/types/weather.js';

	// Props
	interface PageProps {
		data: WeatherOverview;
	}
	let { data }: PageProps = $props();

	// Logic
	let orientation = windowOrientation;
</script>

<article class="overview">
	{#if $orientation === 'landscape'}
		<DesktopOverview {data} />
	{:else if $orientation === 'portrait'}
		<MobileOverview {data} />
	{/if}
</article>
