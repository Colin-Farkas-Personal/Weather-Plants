<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button/Button.svelte';
	import OverviewCondition from '$lib/components/OverviewCondition/OverviewCondition.svelte';
	import OverviewRange from '$lib/components/OverviewRange/OverviewRange.svelte';
	import OverviewTemperature from '$lib/components/OverviewTemperature/OverviewTemperature.svelte';
	import PageLayout from '$lib/components/Page/PageLayout.svelte';
	import { getSceneTheme } from '$lib/components/PlantScene/parseTheme';
	import PlantScene from '$lib/components/PlantScene/PlantScene.svelte';
	import conditionStatusStore from '$lib/globals/conditionStatusStore.svelte.js';
	import temperatureRangeStore from '$lib/globals/temperatureRangeStore.svelte.js';
	import { windowOrientation } from '$lib/globals/windowStore';
	import { getCurrentHour } from '$lib/helpers/current-hour';
	import type { TemperatureRange } from '$lib/types/temperature.js';
	import type { WeatherOverview } from '$lib/types/weather.js';
	import ArrowLeftBoldIcon from '~icons/ph/arrow-left-bold';

	// Props
	interface PageProps {
		data: WeatherOverview;
	}
	let { data }: PageProps = $props();

	// State
	let currentSceneTheme = $derived(getSceneTheme($temperatureRangeStore, $conditionStatusStore));
	const currentHour = $derived(getCurrentHour());

	$effect(() => {
		updateOverviewData();
	});

	async function updateOverviewData() {
		const streamedOverviewData = await data.streamed.overview;
		temperatureRangeStore.setRange(streamedOverviewData.temperature);
		conditionStatusStore.setCondition(streamedOverviewData.condition.text);

		setThemeAttributeName($temperatureRangeStore as TemperatureRange);
	}

	function setThemeAttributeName(theme: TemperatureRange | 'default') {
		document.documentElement.setAttribute('data-theme', theme.toLowerCase());
	}

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
			<ArrowLeftBoldIcon class="icon-small" />
			Back
		</Button>
	{/snippet}
	{#snippet PrimarySectionContent()}
		{#await data.streamed.overview}
			<p>Loading data</p>
		{:then streamed}
			<article class={`overview-page-data ${$orientation}`}>
				<OverviewCondition condition={streamed.condition.text} />
				<OverviewTemperature
					temperature={streamed.temperature}
					feelsLike={streamed.feelsLike}
				/>
				<OverviewRange min={streamed.dailyRange.min} max={streamed.dailyRange.max} />
			</article>
		{/await}
	{/snippet}
	{#snippet Scene()}
		<PlantScene sceneTheme={currentSceneTheme} {currentHour} />
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
