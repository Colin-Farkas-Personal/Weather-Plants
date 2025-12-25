<script lang="ts">
	import { page } from '$app/state';
	import LocateMeButton from '$lib/components/LocateMeButton/LocateMeButton.svelte';
	import PageLayout from '$lib/components/Page/PageLayout.svelte';
	import { getSceneTheme } from '$lib/components/PlantScene/parseTheme';
	import PlantScene from '$lib/components/PlantScene/PlantScene.svelte';
	import { defaultTheme } from '$lib/components/PlantScene/themes/default';
	import SearchResultItem from '$lib/components/SearchResult/SearchResultItem.svelte';
	import SearchResultList from '$lib/components/SearchResult/SearchResultList.svelte';
	import LocationTextInput from '$lib/components/TextInput/LocationTextInput.svelte';
	import {
		statusToConditionLabel,
		type ConditionStatus,
	} from '$lib/globals/conditionStatusStore.svelte';
	import { windowOrientation } from '$lib/globals/windowStore';
	import type { TemperatureRange } from '$lib/types/temperature';
	import { onMount } from 'svelte';
	import GpsBoldIcon from '~icons/ph/gps-bold';
	import type { SearchData } from './+page.server';

	const SUNRISE_HOUR_DEFAULT = 6;
	const SUNSET_HOUR_DEFAULT = 18;

	type SearchType = 'input' | 'current';

	interface PageProps {
		data: SearchData;
	}
	let { data }: PageProps = $props();

	// State
	const orientation = windowOrientation;
	let currentSceneTheme = $derived(
		getSceneTheme({
			range: getRandomTemperatureRange(),
			condition: getRandomCondition(),
			currentHour: getRandomCurrentHour(),
			sunriseHour: SUNRISE_HOUR_DEFAULT,
			sunsetHour: SUNSET_HOUR_DEFAULT,
		}),
	);

	let currentSearchType = $derived(getCurrentSearchType());
	const hasSearched = $derived(currentSearchType.length > 0);
	let secondarySectionHeading = $derived(setSecondarySectionHeading);

	/// Lifecycle
	onMount(() => {
		document.documentElement.setAttribute('data-theme', 'default');
	});

	// Functions
	function getRandomTemperatureRange(): TemperatureRange {
		const ranges = ['Cold', 'Pleasant', 'Hot'] as TemperatureRange[];
		return ranges[Math.floor(Math.random() * ranges.length)];
	}

	function getRandomCondition(): ConditionStatus {
		const conditionStatuses = Object.keys(statusToConditionLabel) as ConditionStatus[];
		return conditionStatuses[Math.floor(Math.random() * conditionStatuses.length)];
	}

	function getRandomCurrentHour(): number {
		return Math.floor(
			Math.random() * (SUNSET_HOUR_DEFAULT - SUNRISE_HOUR_DEFAULT + 1) + SUNRISE_HOUR_DEFAULT,
		);
	}

	function getCurrentSearchType(): SearchType | '' {
		const urlParams = page.url.searchParams;

		if (urlParams.has('lat') && urlParams.has('lon')) {
			return 'current';
		}

		if (urlParams.has('input')) {
			return 'input';
		}

		return '';
	}

	function setSecondarySectionHeading() {
		if (currentSearchType === 'current') {
			return 'Your current location';
		}

		if (currentSearchType === 'input') {
			return 'Results';
		}

		return '';
	}
</script>

{#snippet SecondarySectionContent()}
	{#if currentSearchType === 'input'}
		{#await data.streamed.searchResults}
			<p>Loading...</p>
		{:then searchResults}
			{#if searchResults}
				<SearchResultList>
					{#each searchResults as result (result.id)}
						<SearchResultItem
							lon={result.lon}
							lat={result.lat}
							country={result.country}
							region={result.county}
							city={result.city}
						/>
					{/each}
				</SearchResultList>
			{/if}
		{/await}
	{:else if currentSearchType === 'current'}
		{#await data.streamed.currentLocation}
			<p>Loading...</p>
		{:then currentLocation}
			{#if currentLocation}
				<SearchResultList>
					<SearchResultItem
						lon={currentLocation.lon}
						lat={currentLocation.lat}
						country={currentLocation.country}
						region={currentLocation.county}
						city={currentLocation.city}
					>
						{#snippet Icon()}
							<GpsBoldIcon class="icon-large" />
						{/snippet}
					</SearchResultItem>
				</SearchResultList>
			{/if}
		{/await}
	{/if}
{/snippet}

<PageLayout
	heading="What's the weather like in...?"
	secondarySectionProps={{
		Content: SecondarySectionContent,
		heading: secondarySectionHeading(),
	}}
	className="main-page"
	sceneBackground={currentSceneTheme.background.color}
	blurScene={hasSearched}
>
	{#snippet PrimarySectionContent()}
		<div class={`main-page-selection ${$orientation}`}>
			<form method="GET">
				<LocationTextInput />
			</form>
			<form method="GET">
				<LocateMeButton />
			</form>
		</div>
	{/snippet}
	{#snippet Scene()}
		<PlantScene sceneTheme={defaultTheme} />
	{/snippet}
</PageLayout>

<style lang="scss">
	.main-page-selection {
		display: flex;
		flex-direction: column;
		gap: 8px;

		width: 100%;

		&.landscape {
			margin-top: 60px;
		}
	}
</style>
