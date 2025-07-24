<script lang="ts">
	import Divider from '$lib/components/Divider/Divider.svelte';
	import ThermometerCold from '$lib/components/Icon/Bold/ThermometerCold.svelte';
	import ThermometerHot from '$lib/components/Icon/Bold/ThermometerHot.svelte';
	import OverviewCondition from '$lib/components/OverviewCondition/OverviewCondition.svelte';
	import OverviewLocation from '$lib/components/OverviewLocation/OverviewLocation.svelte';
	import OverviewRange from '$lib/components/OverviewRange/OverviewRange.svelte';
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
	<section class="display">
		<OverviewLocation locationName={data.location.name} countryName={data.location.country} />
		<PlantScene temperature={data.temperature} variant="mobile" />
	</section>

	<section class="details">
		<OverviewCondition condition={data.condition.text} />

		<OverviewTemperature temperature={data.temperature} feelsLike={data.feelsLike} />

		<OverviewRange>
			<OverviewRangeMinimal
				Icon={ThermometerCold}
				temp={data.dailyRange.min}
				ariaHidden="Lowest temperature today"
			/>
			<Divider type="bull" />
			<OverviewRangeMinimal
				Icon={ThermometerHot}
				temp={data.dailyRange.max}
				ariaHidden="Highest temperature today"
			/>
		</OverviewRange>
	</section>
</main>

<style lang="scss">
	.mobile-overview {
		display: flex;
		flex-direction: column;
		height: 100vh;

		background-color: #e28439;

		.display {
			display: flex;
			flex-direction: column;
			flex: 2;
		}

		.details {
			flex: 1;

			display: flex;
			flex-direction: column;
			justify-content: center;
			margin: 0 auto;
			gap: 1rem;
		}

		:global(.overview-location) {
			padding-top: 3rem;
			background-color: #f2d784;
		}
	}
</style>
