<script lang="ts">
	import DesktopOverview from '$lib/components/Pages/Overview/DesktopOverview.svelte';
	import MobileOverview from '$lib/components/Pages/Overview/MobileOverview.svelte';


	import type { WeatherOverview } from '$lib/types/weather.js';
	import { onMount } from 'svelte';

	// Props
	interface PageProps {
		data: WeatherOverview;
	}
	let { data }: PageProps = $props();

	// States & logic
	let isDesktop = $state(false);

	onMount(() => {
		isDesktop = checkScreenSize(window.innerWidth);
	})

	function checkScreenSize(size: number) {
		return size >= 750;
	}

	function onresize(event: UIEvent) {
		const currentTarget = event.currentTarget as Window;

		isDesktop = checkScreenSize(currentTarget.innerWidth)
	}
</script>

<svelte:window {onresize} />

{#if isDesktop}
	<DesktopOverview {data} />
{:else}
	<MobileOverview {data} />
{/if}
