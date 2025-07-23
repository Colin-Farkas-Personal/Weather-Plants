<script lang="ts">
	import ThermometerCold from '$lib/components/Icon/Bold/ThermometerCold.svelte';
	import ThermometerHot from '$lib/components/Icon/Bold/ThermometerHot.svelte';
	import OverviewCondition from '$lib/components/OverviewCondition/OverviewCondition.svelte';
	import OverviewLocation from '$lib/components/OverviewLocation/OverviewLocation.svelte';
	import OverviewRangeDescriptive from '$lib/components/OverviewRange/OverviewRangeDescriptive.svelte';
	import OverviewTemperature from '$lib/components/OverviewTemperature/OverviewTemperature.svelte';
	import PlantScene from '$lib/components/PlantScene/PlantScene.svelte';
	import type { WeatherOverview } from '$lib/types/weather';

	interface DesktopOverviewProps {
		data: WeatherOverview;
	}

	let { data }: DesktopOverviewProps = $props();
</script>

<main class="overview-main-desktop">
	<section class="left-column">
		<OverviewLocation locationName={data.location.name} countryName={data.location.country} variant="desktop" />

		<OverviewCondition condition={data.condition.text} />
		<hr />
		<OverviewTemperature temperature={data.temperature} feelsLike={data.feelsLike} />
		<dl>
			<OverviewRangeDescriptive Icon={ThermometerCold} label="Lowest" temp={data.dailyRange.min} />
			<OverviewRangeDescriptive Icon={ThermometerHot} label="Highest" temp={data.dailyRange.max} />
		</dl>
	</section>

	<aside class="right-column">
		<PlantScene temperature={data.temperature} variant="desktop" />
	</aside>
</main>

<style lang="scss">
	.overview-main-desktop {
		display: flex;
		height: 100%;
		background-color: orange;

		.left-column {
			flex: 1;
		}

		.right-column {
			flex: 2;
		}
	}
</style>
