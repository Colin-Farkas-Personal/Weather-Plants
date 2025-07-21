<script lang="ts">
	import DesktopOverview from '$lib/components/pages/Overview/DesktopOverview.svelte';
	import MobileOverview from '$lib/components/pages/Overview/MobileOverview.svelte';


	import type { WeatherOverview } from '$lib/types/weather.js';

	// Props
	interface PageProps {
		data: WeatherOverview;
	}
	let { data }: PageProps = $props();

	// States & logic
	let isDesktop = $state(false);

	function onresize(event: UIEvent) {
		const currentTarget = event.currentTarget as Window;

		isDesktop = currentTarget.innerWidth >= 750;
	}
</script>

<svelte:window {onresize} />

{#if isDesktop}
	<DesktopOverview {data} />
{:else}
	<MobileOverview {data} />
{/if}
