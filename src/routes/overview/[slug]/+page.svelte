<script lang="ts">
	import OverviewCondition from '$lib/components/OverviewCondition/OverviewCondition.svelte';
	import OverviewRange from '$lib/components/OverviewRange/OverviewRange.svelte';
	import OverviewTemperature from '$lib/components/OverviewTemperature/OverviewTemperature.svelte';
	import PageLayout from '$lib/components/Page/PageLayout.svelte';
	import PlantScene from '$lib/components/PlantScene/PlantScene.svelte';
	import CloudBoldIcon from '$lib/components/Icon/Bold/CloudBold.svelte';
	import ArrowLeftBoldIcon from '~icons/ph/arrow-left-bold';
	import type { WeatherOverview } from '$lib/types/weather.js';
	import { windowOrientation } from '$lib/globals/windowStore';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button/Button.svelte';

	// Props
	interface PageProps {
		data: WeatherOverview;
	}
	let { data }: PageProps = $props();

	// Logic
	const orientation = windowOrientation;
</script>

<PageLayout
	heading={data.location.name}
	subHeading={data.location.country}
	className="overview-page"
>
	{#snippet MainTopBar()}
		<Button onClick={() => goto('/')} variant="secondary" size="medium">
			<ArrowLeftBoldIcon class="icon-medium" />
			Back
		</Button>
	{/snippet}
	{#snippet PrimarySectionContent()}
		<article class={`overview-page-data ${$orientation}`}>
			<OverviewCondition condition={data.condition.text} />
			<OverviewTemperature temperature={data.temperature} feelsLike={data.feelsLike} />
			<OverviewRange min={data.dailyRange.min} max={data.dailyRange.max} />
		</article>
	{/snippet}
	{#snippet Scene()}
		<PlantScene />
	{/snippet}
</PageLayout>

<style lang="scss">
	:global {
		.overview-page {
			background-color: var(--theme-bg-primary);
		}

		.overview-page-data.portrait {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 25px;
		}

		.overview-page-data.landscape {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 40px;

			margin-top: 120px;
		}
	}
</style>
