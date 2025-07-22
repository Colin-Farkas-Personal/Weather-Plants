<script lang="ts">
	interface OverviewRangeDescriptiveProps {
		locationName: string;
		countryName: string;
		variant: 'mobile' | 'desktop';
	}

	let { locationName, countryName, variant }: OverviewRangeDescriptiveProps = $props();
</script>

<hgroup class={`overview-location ${variant}`}>
	<h1>{locationName}</h1>
	<p>{countryName}</p>
</hgroup>

<style lang="scss">
	.overview-location {
		background-color: #F2D784;
		text-align: center;
	}
</style>