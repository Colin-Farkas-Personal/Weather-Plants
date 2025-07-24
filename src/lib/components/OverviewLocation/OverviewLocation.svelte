<script lang="ts">
	interface OverviewRangeDescriptiveProps {
		locationName: string;
		countryName: string;
	}

	let { locationName, countryName }: OverviewRangeDescriptiveProps = $props();
</script>

<hgroup class={`overview-location`}>
	<h1>{locationName}</h1>
	<p>{countryName}</p>
</hgroup>

<style lang="scss">
	.overview-location {
		text-align: center;
	}
</style>