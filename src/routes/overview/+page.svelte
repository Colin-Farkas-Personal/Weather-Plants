<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import Button from '$lib/components/Button/Button.svelte';
	import DisplayWheel from '$lib/components/DisplayWheel/DisplayWheel.svelte';
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
	import { transitionValue } from '$lib/components/ScrollWheel/transition';
	import getCurrentCondition, {
		type ConditionStatus,
		type CurrentCondition,
	} from '$lib/globals/conditionStatusStore.svelte.js';
	import { forecastDisplay } from '$lib/globals/forecastTimeLineStore.svelte';
	import temperatureRangeStore from '$lib/globals/temperatureRangeStore.svelte.js';
	import { windowOrientation } from '$lib/globals/windowStore';
	import type { TemperatureRange } from '$lib/types/temperature.js';
	import type { WeatherOverview } from '$lib/types/weather.js';
	import { getCurrentAstro, type CurrentAstro } from '$lib/utilities/current-astro';
	import { easeOut } from '$lib/utilities/easing-function';
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
	let currentHour = $derived<number>(0);
	let forecastNumber = $derived<number>(currentHour);
	// let onValueCommitNumber = $state<number>(0);

	let astro = $state<{ sunriseHour: number; sunsetHour: number } | null>(null);
	let currentSceneTheme = $state<SceneTheme>(defaultTheme);
	let isNight = $state(false);
	let isTimeScroll = $state(false);
	let cancelTransition: (() => void) | null = null;

	type MainOverviewData = {
		temperature: number;
		feelsLike: number;
		condition: CurrentCondition;
		astro: CurrentAstro | null;
	};
	let mainOverviewData = $state<MainOverviewData | null>(null);

	type HourlyCondition = {
		hour: number;
		temperature: number;
		feelsLike: number;
		condition: CurrentCondition;
		astro: CurrentAstro | null;
	};
	const forecastOverviewData = [] as HourlyCondition[];

	onMount(() => {
		fetchOverviewDataByInterval(DATA_FETCH_INTERVAL_MINUTES);
	});

	$effect(() => {
		initializeOverview();
	});

	$effect(() => {
		if (!isTimeScroll && !$forecastDisplay) {
			transitionToCurrentHour();
		}
	});

	$effect(() => {
		if (isTimeScroll || $forecastDisplay) {
			const index = Math.round(forecastNumber);
			const currentHourCondition = forecastOverviewData[index];
			if (!currentHourCondition) return;
			updateOverviewScene(forecastNumber, currentHourCondition.condition.status);
		}
	});

	onDestroy(() => {
		clearInterval(timer);
		cancelTransition?.();
	});

	// Functions
	function fetchOverviewDataByInterval(intervalMinutes: number) {
		const intervalMilliseconds = intervalMinutes * 60 * 1000;

		const refresh = async () => {
			// reruns +page.server.ts load() and updates the UI
			await invalidateAll();
		};

		timer = setInterval(refresh, intervalMilliseconds);
	}

	function updateOverviewScene(hourValue: number, conditionStatus: ConditionStatus) {
		if (!astro || !$temperatureRangeStore) return;

		// Set night sky
		isNight = hourValue < astro.sunriseHour || hourValue > astro.sunsetHour;

		// Update scene theme
		currentSceneTheme = getSceneTheme({
			range: $temperatureRangeStore,
			condition: conditionStatus,
			currentHour: hourValue,
			sunriseHour: astro.sunriseHour,
			sunsetHour: astro.sunsetHour,
		});
	}

	async function initializeOverview() {
		const streamedOverviewData = await data.streamed.overview;

		// 1. Set temperature range
		temperatureRangeStore.setRange(streamedOverviewData.temperature);

		// 2. Set times
		currentHour = getHourFromTimeString(streamedOverviewData.localTime);

		const sunriseHour = getHourFromTimeString(streamedOverviewData.astro.sunrise);
		const sunsetHour = getHourFromTimeString(streamedOverviewData.astro.sunset);
		astro = {
			sunriseHour: sunriseHour,
			sunsetHour: sunsetHour,
		};

		// 3. Update main theme attribute
		updateMainTheme();

		// 4. Set mainOverviewData and forecastOverviewData
		const conditionCode = streamedOverviewData.condition.code;
		const timeOfDay = currentHour < sunriseHour || currentHour > sunsetHour ? 'night' : 'day';

		mainOverviewData = {
			temperature: streamedOverviewData.temperature,
			feelsLike: streamedOverviewData.feelsLike,
			condition: getCurrentCondition(conditionCode, timeOfDay),
			astro: getCurrentAstro(currentHour, sunriseHour, sunsetHour),
		};

		console.log(
			'HOUR TEMPERATURES',
			streamedOverviewData.dailyForecast.map((item) => ({
				hour: item.hour,
				temp: item.temperature,
			})),
		);
		for (const hourData of streamedOverviewData.dailyForecast) {
			const conditionCode = hourData.condition.code;
			const timeOfDay =
				hourData.hour < sunriseHour || hourData.hour > sunsetHour ? 'night' : 'day';

			const currentObject = {
				hour: hourData.hour,
				temperature: hourData.temperature,
				feelsLike: hourData.feelsLike,
				condition: getCurrentCondition(conditionCode, timeOfDay),
				astro: getCurrentAstro(hourData.hour, sunriseHour, sunsetHour),
			};

			forecastOverviewData.push(currentObject);
		}

		// 5. Render the initial scene
		updateOverviewScene(currentHour, mainOverviewData.condition.status);
	}

	function updateMainTheme() {
		const theme = $temperatureRangeStore as TemperatureRange | 'default';
		document.documentElement.setAttribute('data-theme', theme.toLowerCase());
	}

	function handleOnValueChageNumber(value: number) {
		// Call global state to display the DisplayWheel time
		if (!$forecastDisplay && !isTimeScroll) {
			forecastDisplay.show();
		}

		isTimeScroll = true;
		forecastNumber = value;
	}

	function handleOnValueCommitNumber() {
		isTimeScroll = false;
		// onValueCommitNumber = value;
	}

	const TRANSITION_DURATION_MS = 450;
	function transitionToCurrentHour() {
		if (!mainOverviewData?.condition) return;
		const conditionStatus = mainOverviewData.condition.status;
		if (forecastNumber === currentHour) {
			updateOverviewScene(currentHour, conditionStatus);
			return;
		}

		isTimeScroll = true;
		cancelTransition?.();

		cancelTransition = transitionValue(
			forecastNumber,
			currentHour,
			(value) => {
				forecastNumber = value;
			},
			() => {
				forecastNumber = currentHour;
				isTimeScroll = false;
				updateOverviewScene(currentHour, conditionStatus);
			},
			{ duration: TRANSITION_DURATION_MS, easingFunction: easeOut },
		);
	}

	const forecastHours = $derived(
		forecastOverviewData.map((item) => ({
			hour: item.hour,
			condition: item.condition.status,
			astro: item.astro?.status,
		})),
	);

	const activeOverviewData = $derived.by(() => {
		if (isTimeScroll || $forecastDisplay) {
			return forecastOverviewData[Math.round(forecastNumber)] || null;
		} else {
			return mainOverviewData;
		}
	});
</script>

{#snippet TimeScroll()}
	<div class="time-scroll">
		<ScrollWheel
			min={0}
			max={23}
			step={1}
			value={forecastNumber}
			onValueChange={handleOnValueChageNumber}
			onValueCommit={handleOnValueCommitNumber}
		/>
	</div>
{/snippet}

{#snippet DisplayWheelSnippet()}
	<DisplayWheel
		{currentHour}
		forecastHour={forecastNumber}
		dailyConditionForecast={forecastHours}
	/>
{/snippet}

<PageLayout
	heading={data.location.name}
	subHeading={data.location.country}
	sceneBackground={currentSceneTheme.background.color}
	showNightStars={isNight}
	className="overview-page"
	ForecastScroll={TimeScroll}
	ForecastDisplay={DisplayWheelSnippet}
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
				{#if activeOverviewData}
					<OverviewCondition
						label={activeOverviewData?.astro?.label ??
							activeOverviewData?.condition.label}
						status={activeOverviewData?.astro?.status ??
							activeOverviewData?.condition.status}
					/>
				{/if}

				{#if $orientation === 'landscape'}
					<OverviewTemperatureRangeGauge
						min={streamed.dailyRange.min}
						max={streamed.dailyRange.max}
						value={activeOverviewData?.temperature ?? streamed.temperature}
					/>

					<p class="feels-like">
						Feels like {activeOverviewData?.feelsLike ?? streamed.feelsLike}°C
					</p>
				{:else if $orientation === 'portrait'}
					<OverviewTemperature
						temperature={activeOverviewData?.temperature ?? streamed.temperature}
						feelsLike={activeOverviewData?.feelsLike ?? streamed.feelsLike}
					/>

					<OverviewTemperatureRangeLinearGauge
						min={streamed.dailyRange.min}
						max={streamed.dailyRange.max}
						value={activeOverviewData?.temperature ?? streamed.temperature}
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
			gap: clamp(12px, 3.5cqi, 32px);
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
