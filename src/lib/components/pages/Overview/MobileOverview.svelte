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
	<section id="mobile-overview-top-column" class="top-column">
		<OverviewLocation
			locationName={data.location.name}
			countryName={data.location.country}
			variant="mobile"
		/>
		<div class="size-container">
			<PlantScene temperature={data.temperature} variant="mobile"/>
		</div>
	</section>

	<section class="bottom-column">
		<OverviewTemperature temperature={data.temperature} feelsLike={data.feelsLike} />

		<OverviewRangeMinimal Icon={ThermometerCold} temp={data.dailyRange.min} />
		<OverviewCondition condition={data.condition.text} />
		<OverviewRangeMinimal Icon={ThermometerHot} temp={data.dailyRange.max} />
	</section>
</main>

<style lang="scss">
	.mobile-overview {
		position: relative;
		display: flex;
		flex-direction: column;
		height: 100vh;

		.top-column {
			display: flex;
			flex-direction: column;
			flex: 2;

			.size-container {
				position: relative;
				flex: 1;
			}
		}

		.bottom-column {
			flex: 1;
		}
	}
</style>
