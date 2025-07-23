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
		text-align: center;
	}
	
	.mobile {
		padding-top: 3rem;
		background-color: #F2D784;
	}

	.desktop {
		// Somthing
	}
</style>