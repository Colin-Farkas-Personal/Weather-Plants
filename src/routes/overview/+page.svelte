<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button/Button.svelte';
	import OverviewCondition from '$lib/components/OverviewCondition/OverviewCondition.svelte';
	import OverviewTemperature from '$lib/components/OverviewTemperature/OverviewTemperature.svelte';
	import OverviewTemperatureRangeLinearGauge from '$lib/components/OverviewTemperatureRangeGauge/OverviewTemperatureRangeLinearGauge.svelte';
	import OverviewTemperatureRangeGauge from '$lib/components/OverviewTemperatureRangeGauge/OverviewTemperatureRangeRadialGauge.svelte';
	import PageLayout from '$lib/components/Page/PageLayout.svelte';
	import { getSceneTheme } from '$lib/components/PlantScene/parseTheme';
	import PlantScene from '$lib/components/PlantScene/PlantScene.svelte';
	import { defaultTheme } from '$lib/components/PlantScene/themes/default';
	import type { SceneTheme } from '$lib/components/PlantScene/themes/theme.types';
	import getCurrentCondition, {
		type CurrentCondition,
	} from '$lib/globals/conditionStatusStore.svelte.js';
	import temperatureRangeStore from '$lib/globals/temperatureRangeStore.svelte.js';
	import { windowOrientation } from '$lib/globals/windowStore';
	import { getCurrentHour } from '$lib/helpers/current-hour';
	import type { TemperatureRange } from '$lib/types/temperature.js';
	import type { WeatherOverview } from '$lib/types/weather.js';
	import { getHourFromTimeString } from '$lib/utilities/formatted-hours';
	import ArrowLeftBoldIcon from '~icons/ph/arrow-left-bold';

	// Props
	interface PageProps {
		data: WeatherOverview;
	}

	let { data }: PageProps = $props();

	// State
	const orientation = windowOrientation;
	let currentHour = $state(getCurrentHour());

	let currentConditionStatus = $state<CurrentCondition>();
	let currentSceneTheme = $state<SceneTheme>(defaultTheme);

	$effect(() => {
		initializeOverview();
	});

	async function initializeOverview() {
		const streamedOverviewData = await data.streamed.overview;

		// 1. Set temperature range
		temperatureRangeStore.setRange(streamedOverviewData.temperature);

		// 2. Update condition
		currentConditionStatus = getCurrentCondition(streamedOverviewData.condition.code, 'night');

		// 3. Update scene theme (now that temp + condition are known)
		currentSceneTheme = getSceneTheme({
			range: $temperatureRangeStore,
			condition: currentConditionStatus.status,
			currentHour,
			sunriseHour: getHourFromTimeString(streamedOverviewData.astro.sunrise),
			sunsetHour: getHourFromTimeString(streamedOverviewData.astro.sunset),
		});

		// 4. Update main theme attribute
		updateMainTheme();
	}

	function updateMainTheme() {
		const theme = $temperatureRangeStore as TemperatureRange | 'default';
		document.documentElement.setAttribute('data-theme', theme.toLowerCase());
	}
</script>

<PageLayout
	heading={data.location.name}
	subHeading={data.location.country}
	sceneBackground={currentSceneTheme.background.color}
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
				<!-- <h4>{currentHour}</h4>
				<p>0</p>
				<input type="range" min="0" max="24" step="0.25" bind:value={currentHour} />
				<p>24</p> -->
				{#if currentConditionStatus}
					<OverviewCondition
						label={currentConditionStatus.label}
						status={currentConditionStatus.status}
					/>
				{/if}

				{#if $orientation === 'landscape'}
					<OverviewTemperatureRangeGauge
						min={streamed.dailyRange.min}
						max={streamed.dailyRange.max}
						value={streamed.temperature}
					/>
					<p class="feels-like">Feels like {streamed.feelsLike}°C</p>
				{:else if $orientation === 'portrait'}
					<OverviewTemperature
						temperature={streamed.temperature}
						feelsLike={streamed.feelsLike}
					/>

					<OverviewTemperatureRangeLinearGauge
						min={streamed.dailyRange.min}
						max={streamed.dailyRange.max}
						value={streamed.temperature}
					/>
				{/if}
			</article>
		{/await}
	{/snippet}
	{#snippet Scene()}
		<PlantScene sceneTheme={currentSceneTheme} />
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
			gap: clamp(24px, 8cqi, 32px);
		}

		.overview-page-data.landscape {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 60px;

			margin-top: 120px;
		}

		.feels-like {
			font-size: var(--fluid-size-em-medium-minus);
			font-weight: bold;
			color: var(--theme-text-secondary);

			padding: var(--fluid-size-em-mini) var(--fluid-size-em-mini-plus);
			border: 3px solid var(--theme-border-secondary);
			border-radius: 60px;
		}
	}
</style>
