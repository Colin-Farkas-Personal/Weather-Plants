<script lang="ts">
	import Button from '$lib/components/Button/Button.svelte';
	import SunDimBoldIcon from '$lib/components/Icon/Bold/SunDimBold.svelte';
	import PageLayout from '$lib/components/Page/PageLayout.svelte';
	import SearchResultItem from '$lib/components/SearchResult/SearchResultItem.svelte';
	import SearchResultList from '$lib/components/SearchResult/SearchResultList.svelte';
	import TextInput from '$lib/components/TextInput/TextInput.svelte';
	import { windowOrientation } from '$lib/globals/windowStore';
	import type { LocationSearchResult } from '$lib/types/location-search.js';
	import { onMount } from 'svelte';

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
				name={currentLocation.name}
				country={currentLocation.country}
				region={currentLocation.region}
			>
				{#snippet Icon()}
					<SunDimBoldIcon size="32" />
				{/snippet}
			</SearchResultItem>
		</SearchResultList>
	{/if}

	{#if searchResults.length > 0}
		<SearchResultList>
			{#each searchResults as result (result.id)}
				<SearchResultItem
					name={result.name}
					country={result.country}
					region={result.region}
				/>
			{/each}
		</SearchResultList>
	{:else if noSearchResults()}
		<p>No results found. Try searching for another location.</p>
	{/if}
{/snippet}

<PageLayout
	heading="What's the weather like in...?"
	secondarySectionProps={{ Content: SecondarySectionContent, heading: secondarySectionHeading() }}
	className="main-page"
>
	{#snippet PrimarySectionContent()}
		<div class={`main-page-selection ${$orientation}`}>
			<form method="GET">
				<TextInput
					id="location"
					name="inputSubmit"
					placeholder="Madrid..."
					required
					ariaLabel="Enter a location"
				/>
			</form>
			<form method="GET">
				<Button name="locateMe" label="My current location" />
			</form>
		</div>
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
