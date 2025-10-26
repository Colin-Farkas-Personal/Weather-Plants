<script lang="ts">
	import LocateMeButton from '$lib/components/LocateMeButton/LocateMeButton.svelte';
	import PageLayout from '$lib/components/Page/PageLayout.svelte';
	import PlantScene from '$lib/components/PlantScene/PlantScene.svelte';
	import { defaultTheme } from '$lib/components/PlantScene/themes/default';
	import SearchResultItem from '$lib/components/SearchResult/SearchResultItem.svelte';
	import SearchResultList from '$lib/components/SearchResult/SearchResultList.svelte';
	import LocationTextInput from '$lib/components/TextInput/LocationTextInput.svelte';
	import { windowOrientation } from '$lib/globals/windowStore';
	import type { LocationSearchResult } from '$lib/types/location-search.js';
	import { onMount } from 'svelte';
	import GpsBoldIcon from '~icons/ph/gps-bold';

	interface PageProps {
		data: {
			currentLocation: LocationSearchResult;
			searchResults: LocationSearchResult[];
			noSearchResults: boolean | null;
		};
	}
	let { data }: PageProps = $props();

	const orientation = windowOrientation;

	const currentLocation = $derived(data.currentLocation);
	const searchResults = $derived(data.searchResults);
	const noSearchResults = $derived(() => data.noSearchResults);

	const secondarySectionHeading = $derived(() => {
		if (currentLocation) return 'Your current location';
		if (searchResults.length > 0) return 'Results';
		if (noSearchResults()) return 'No results';
		return '';
	});

	onMount(() => {
		document.documentElement.setAttribute('data-theme', 'default');
	});
</script>

{#snippet SecondarySectionContent()}
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

	{#if searchResults.length > 0}
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
	{:else if noSearchResults()}
		<p>No results found. Try searching for another location.</p>
	{/if}
{/snippet}

<PageLayout
	heading="What's the weather like in...?"
	secondarySectionProps={{
		Content: SecondarySectionContent,
		heading: secondarySectionHeading(),
	}}
	className="main-page"
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
