<script lang="ts">
	interface OverviewRangeDescriptiveProps {
		locationName: string;
		countryName: string;
	}

	let { locationName, countryName }: OverviewRangeDescriptiveProps = $props();
</script>

<hgroup class="overview-location">
	<h1 class="header">{locationName}</h1>
	<p class="description">{countryName}</p>
</hgroup>

<style lang="scss">
	.overview-location {
		text-align: center;
	}
</style>