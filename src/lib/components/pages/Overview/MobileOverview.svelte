<script lang="ts">
	import ThermometerCold from '$lib/components/Icon/Bold/ThermometerCold.svelte';
	import ThermometerHot from '$lib/components/Icon/Bold/ThermometerHot.svelte';
	import OverviewCondition from '$lib/components/OverviewCondition/OverviewCondition.svelte';
	import OverviewLocation from '$lib/components/OverviewLocation/OverviewLocation.svelte';
	import OverviewRangeMinimal from '$lib/components/OverviewRange/OverviewRangeMinimal.svelte';
	import OverviewTemperature from '$lib/components/OverviewTemperature/OverviewTemperature.svelte';
	import PlantScene from '$lib/components/PlantScene/PlantScene.svelte';
	import type { WeatherOverview } from '$lib/types/weather';

	interface MobileOverviewProps {
		data: WeatherOverview;
	}

	let { data }: MobileOverviewProps = $props();
</script>

<main class="mobile-overview">
	<section class="top-row">
		<OverviewLocation
			locationName={data.location.name}
			countryName={data.location.country}
			variant="mobile"
		/>
		<div class="size-container">
			<PlantScene temperature={data.temperature} variant="mobile"/>
		</div>
	</section>

	<section class="bottom-row">
		<OverviewTemperature temperature={data.temperature} feelsLike={data.feelsLike} />

		<div class="overview-details">
			<OverviewRangeMinimal Icon={ThermometerCold} temp={data.dailyRange.min} />
			<OverviewCondition condition={data.condition.text} />
			<OverviewRangeMinimal Icon={ThermometerHot} temp={data.dailyRange.max} />
		</div>
	</section>
</main>

<style lang="scss">
	.mobile-overview {
		position: relative;
		display: flex;
		flex-direction: column;
		height: 100vh;

		background-color: orange;

		.top-row {
			display: flex;
			flex-direction: column;
			flex: 2;

			.size-container {
				position: relative;
				flex: 1;
			}
		}

		.bottom-row {
			flex: 1;

			display: flex;
			flex-direction: column;
			justify-content: center;
			margin: 0 auto;
			gap: 1.875rem;
		}

		.overview-details {
			display: flex;
			gap: 1.5rem;		
		}
	}
</style>
