<script lang="ts">
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

<main class="overview-main-mobile">
	<PlantScene temperature={data.temperature} />
	<OverviewLocation locationName={data.location.name} countryName={data.location.country} />

	<section>
		<OverviewTemperature temperature={data.temperature} feelsLike={data.feelsLike} />

		<OverviewRangeMinimal Icon={ThermometerCold} temp={data.dailyRange.min} />
		<OverviewCondition condition={data.condition.text} />
		<OverviewRangeMinimal Icon={ThermometerHot} temp={data.dailyRange.max} />
	</section>
</main>
