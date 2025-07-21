<script lang="ts">
	import type { Component } from 'svelte';

	interface OverviewRangeDescriptiveProps {
        locationName: string;
        countryName: string;
	}

	let { locationName, countryName } = $props();
</script>

<h1>{locationName}</h1>
<p>{countryName}</p>
