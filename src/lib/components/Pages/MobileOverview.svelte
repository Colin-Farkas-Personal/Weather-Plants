<script lang="ts">
	import Divider from '$lib/components/Divider/Divider.svelte';
	import ThermometerCold from '$lib/components/Icon/Bold/ThermometerCold.svelte';
	import ThermometerHot from '$lib/components/Icon/Bold/ThermometerHot.svelte';
	import OverviewCondition from '$lib/components/OverviewCondition/OverviewCondition.svelte';
	import OverviewRange from '$lib/components/OverviewRange/OverviewRange.svelte';
	import OverviewRangeMinimal from '$lib/components/OverviewRange/OverviewRangeMinimal.svelte';
	import OverviewTemperature from '$lib/components/OverviewTemperature/OverviewTemperature.svelte';
	import PlantScene from '$lib/components/PlantScene/PlantScene.svelte';
	import type { WeatherOverview } from '$lib/types/weather';
	import PrimarySection from '../Section/PrimarySection.svelte';
	import SecondarySection from '../Section/Secondary/SecondarySection.svelte';
	import SectionContainer from '../Section/SectionContainer.svelte';

	interface MobileOverviewProps {
		data: WeatherOverview;
	}

	let { data }: MobileOverviewProps = $props();
</script>

<SectionContainer className="mobile-overview">
	<SecondarySection heading={data.location.name} subHeading={data.location.country}>
		{#snippet Scene()}
			<PlantScene />
		{/snippet}
	</SecondarySection>

	<PrimarySection>
		<OverviewCondition condition={data.condition.text} />

		<OverviewTemperature temperature={data.temperature} feelsLike={data.feelsLike} />

		<OverviewRange>
			<OverviewRangeMinimal
				Icon={ThermometerCold}
				temp={data.dailyRange.min}
				ariaLabel="Lowest temperature today"
			/>
			<Divider type="bull" />
			<OverviewRangeMinimal
				Icon={ThermometerHot}
				temp={data.dailyRange.max}
				ariaLabel="Highest temperature today"
			/>
		</OverviewRange>
	</PrimarySection>
</SectionContainer>

<style lang="scss">
	:global {
		.mobile-overview {
			background-color: var(--theme-bg-primary);
		}

		.overview-temperature {
			.value {
				font-size: var(--fluid-size-em-large);
				line-height: 1.2;
			}
			.label {
				font-size: var(--fluid-size-em-small-plus);
			}
		}

		.overview-range {
			gap: var(--fluid-size-em-small);
		}
	}
</style>
