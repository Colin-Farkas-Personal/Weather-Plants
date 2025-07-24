<script lang="ts">
	import Divider from '$lib/components/Divider/Divider.svelte';
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
	<section class="details">
		<OverviewLocation locationName={data.location.name} countryName={data.location.country} />

		<OverviewCondition condition={data.condition.text} />
		<Divider type="line" />
		<OverviewTemperature temperature={data.temperature} feelsLike={data.feelsLike} />
		<dl>
			<OverviewRangeDescriptive Icon={ThermometerCold} label="Lowest" temp={data.dailyRange.min} />
			<OverviewRangeDescriptive Icon={ThermometerHot} label="Highest" temp={data.dailyRange.max} />
		</dl>
	</section>

	<aside class="display">
		<PlantScene temperature={data.temperature} variant="desktop" />
	</aside>
</main>

<style lang="scss">
	.overview-main-desktop {
		display: flex;
		height: 100vh;

		background-color: #e28439;

		.details {
			flex: 1;

			display: flex;
			flex-direction: column;
			justify-content: center;
			margin: 0 auto;
			gap: 1rem;
		}

		.display {
			display: flex;
			flex: 2;
		}

		:global(.overview-location) {
			padding-top: 0rem;
		}
	}
</style>
