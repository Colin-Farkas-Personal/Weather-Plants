<script lang="ts">
	import ThermometerCold from '$lib/components/Icon/Bold/ThermometerCold.svelte';
	import ThermometerHot from '$lib/components/Icon/Bold/ThermometerHot.svelte';
	import OverviewCondition from '$lib/components/OverviewCondition/OverviewCondition.svelte';
	import OverviewLocation from '$lib/components/OverviewLocation/OverviewLocation.svelte';
	import OverviewRange from '$lib/components/OverviewRange/OverviewRange.svelte';
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
	<section>
		<OverviewLocation locationName={data.location.name} countryName={data.location.country} />

		<hgroup>
			<OverviewCondition condition={data.condition.text} />
			<h2>Condition</h2>
		</hgroup>

		<OverviewTemperature temperature={data.temperature} feelsLike={data.feelsLike} />

		<dl>
			<OverviewRangeDescriptive Icon={ThermometerCold} label="Lowest" temp={data.dailyRange.min} />
			<OverviewRangeDescriptive Icon={ThermometerHot} label="Highest" temp={data.dailyRange.max} />
		</dl>
	</section>

	<PlantScene temperature={data.temperature} />
</main>
