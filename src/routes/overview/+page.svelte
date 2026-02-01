<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
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
	import ScrollWheel from '$lib/components/ScrollWheel/ScrollWheel.svelte';
	import getCurrentCondition, {
		type CurrentCondition,
	} from '$lib/globals/conditionStatusStore.svelte.js';
	import temperatureRangeStore from '$lib/globals/temperatureRangeStore.svelte.js';
	import { windowOrientation } from '$lib/globals/windowStore';
	import type { TemperatureRange } from '$lib/types/temperature.js';
	import type { WeatherOverview } from '$lib/types/weather.js';
	import { getHourFromTimeString } from '$lib/utilities/formatted-hours';
	import { onDestroy, onMount } from 'svelte';
	import ArrowLeftBoldIcon from '~icons/ph/arrow-left-bold';

	const DATA_FETCH_INTERVAL_MINUTES = 30;

	// Props
	interface PageProps {
		data: WeatherOverview;
	}

	let { data }: PageProps = $props();

	// State
	let timer: ReturnType<typeof setInterval>;
	const orientation = windowOrientation;
	let currentHour = $state<number>(0);
	let onValueChageNumber = $state<number>(0);
	let onValueCommitNumber = $state<number>(0);

	let currentConditionStatus = $state<CurrentCondition>();
	let astro = $state<{ sunriseHour: number; sunsetHour: number } | null>(null);
	let currentSceneTheme = $state<SceneTheme>(defaultTheme);
	let isNight = $state(false);
	let isTimeScroll = $state(false);

	onMount(() => {
		fetchOverviewDataByInterval(DATA_FETCH_INTERVAL_MINUTES);
	});

	$effect(() => {
		if (isTimeScroll) return;

		initializeOverview();
	});

	$effect(() => {
		if (!currentHour || !astro || !currentConditionStatus) return;

		// Update scene theme
		currentSceneTheme = getSceneTheme({
			range: $temperatureRangeStore ?? 'Cold',
			condition: currentConditionStatus.status,
			currentHour: currentHour,
			sunriseHour: astro.sunriseHour,
			sunsetHour: astro.sunsetHour,
		});

		// Set night sky
		isNight = currentHour < astro.sunriseHour || currentHour > astro.sunsetHour;
	});

	onDestroy(() => clearInterval(timer));

	// Functions
	function fetchOverviewDataByInterval(intervalMinutes: number) {
		const intervalMilliseconds = intervalMinutes * 60 * 1000;

		const refresh = async () => {
			// reruns +page.server.ts load() and updates the UI
			await invalidateAll();
		};

		timer = setInterval(refresh, intervalMilliseconds);
	}

	async function initializeOverview() {
		const streamedOverviewData = await data.streamed.overview;

		// 1. Set temperature range
		temperatureRangeStore.setRange(streamedOverviewData.temperature);

		// 2. Update condition
		currentConditionStatus = getCurrentCondition(streamedOverviewData.condition.code, 'day');

		// 3. Set times
		currentHour = getHourFromTimeString(streamedOverviewData.localTime);
		astro = {
			sunriseHour: getHourFromTimeString(streamedOverviewData.astro.sunrise),
			sunsetHour: getHourFromTimeString(streamedOverviewData.astro.sunset),
		};

		// 4. Update main theme attribute
		updateMainTheme();
	}

	function updateMainTheme() {
		const theme = $temperatureRangeStore as TemperatureRange | 'default';
		document.documentElement.setAttribute('data-theme', theme.toLowerCase());
	}

	function handleOnValueChageNumber(value: number) {
		isTimeScroll = true;
		onValueChageNumber = value;
	}

	function handleOnValueCommitNumber(value: number) {
		isTimeScroll = true;
		onValueCommitNumber = value;
	}
</script>

{#snippet TimeScroll()}
	<div class="time-scroll">
		<h4>{onValueChageNumber}</h4>
		<input type="range" min="0" max="24" step="0.05" bind:value={onValueChageNumber} />
		<ScrollWheel
			min={0}
			max={24}
			step={1}
			value={onValueChageNumber}
			onValueChange={handleOnValueChageNumber}
			onValueCommit={handleOnValueCommitNumber}
		/>
	</div>
{/snippet}

<PageLayout
	heading={data.location.name}
	subHeading={data.location.country}
	sceneBackground={currentSceneTheme.background.color}
	showNightStars={isNight}
	className="overview-page"
	secondarySectionProps={{ BottomContent: TimeScroll }}
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
