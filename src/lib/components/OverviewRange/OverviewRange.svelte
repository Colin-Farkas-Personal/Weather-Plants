<script lang="ts">
	import OverviewRangeDescriptive from './OverviewRangeDescriptive.svelte';
	import OverviewRangeMinimal from './OverviewRangeMinimal.svelte';
	import ThermometerCold from '../Icon/Bold/ThermometerCold.svelte';
	import ThermometerHot from '../Icon/Bold/ThermometerHot.svelte';

	// Props
	interface OverviewRangeProps {
		minTemp?: number;
		maxTemp?: number;
	}
	let { minTemp, maxTemp }: OverviewRangeProps = $props();
</script>

{#if minTemp}
	<OverviewRangeMinimal Icon={ThermometerCold} temp={minTemp} />
	<OverviewRangeDescriptive Icon={ThermometerCold} label="Lowest" temp={minTemp} />
{:else if maxTemp}
	<OverviewRangeMinimal Icon={ThermometerHot} temp={maxTemp} />
	<OverviewRangeDescriptive Icon={ThermometerHot} label="Lowest" temp={maxTemp} />
{/if}

<style lang="scss">
	:global {
		.overview-range-minimal {
			display: block;
		}
		.overview-range-descriptive {
			display: none;
		}

		@media screen and (width >= 750px) {
			.overview-range-minimal {
				display: none;
			}
			.overview-range-descriptive {
				display: block;
			}
		}
	}
</style>
