<script lang="ts">
	import DesktopOverview from '$lib/components/Pages/Overview/DesktopOverview.svelte';
	import MobileOverview from '$lib/components/Pages/Overview/MobileOverview.svelte';


	import type { WeatherOverview } from '$lib/types/weather.js';
	import { screenSize } from '$lib/globals/screenState';
	import { onDestroy } from 'svelte';

	// Props
	interface PageProps {
		data: WeatherOverview;
	}
	let { data }: PageProps = $props();
	
	// Logic
	let _isDesktop = $state(false);

	let unsubscribe = screenSize.subscribe((value) => _isDesktop = value.isDesktop);

	onDestroy(unsubscribe)
</script>


<article class="overview">
	{#if _isDesktop}
		<DesktopOverview {data} />
		{:else}
		<MobileOverview {data} />
	{/if}
</article>

<style lang="scss">
</style>
