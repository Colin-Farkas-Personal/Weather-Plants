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
	import PrimarySection from '../Section/PrimarySection.svelte';
	import SecondarySection from '../Section/SecondarySection.svelte';
	import SectionContainer from '../Section/SectionContainer.svelte';

	interface DesktopOverviewProps {
		data: WeatherOverview;
	}

	let { data }: DesktopOverviewProps = $props();
</script>

<SectionContainer className="desktop-overview">
	<PrimarySection>
		<OverviewLocation locationName={data.location.name} countryName={data.location.country} />

		<article class="details">
			<OverviewCondition condition={data.condition.text} />
			<OverviewTemperature temperature={data.temperature} feelsLike={data.feelsLike} />
			<OverviewRange>
				<OverviewRangeDescriptive
					Icon={ThermometerCold}
					label="Lowest"
					temp={data.dailyRange.min}
					ariaLabel="Lowest temperature today"
				/>
				<OverviewRangeDescriptive
					Icon={ThermometerHot}
					label="Highest"
					temp={data.dailyRange.max}
					ariaLabel="Highest temperature today"
				/>
			</OverviewRange>
		</article>
	</PrimarySection>

	<SecondarySection>
		{#snippet Scene()}
			<PlantScene />
		{/snippet}
	</SecondarySection>
</SectionContainer>

<style lang="scss">
	.details {
		display: inherit;
		flex-direction: inherit;
		align-items: center;
		gap: var(--fluid-size-em-medium-plus);

		margin-top: 10rem;
	}

	:global {
		.desktop-overview {
			background-color: var(--theme-bg-primary);

			.overview-location {
				.header {
					color: var(--theme-text-primary);
					font-size: var(--fluid-size-em-medium-plus);
					font-weight: bold;
				}

				.description {
					color: var(--theme-text-secondary);
					font-size: var(--fluid-size-em-small-plus);
					font-weight: 500;
				}
			}

			.overview-range {
				gap: var(--fluid-size-em-medium);
			}
		}
	}
</style>
