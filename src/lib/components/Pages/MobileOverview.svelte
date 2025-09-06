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
		<PlantScene />
	</section>

	<section class="details isolate">
		<div class="noise"></div>
		<div class="overlay"></div>
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
	</section>
</main>

<style lang="scss">
	.mobile-overview {
		overflow-x: hidden;
		display: flex;
		flex-direction: column;
		height: 100dvh;

		background-color: var(--theme-bg-primary);

		.display {
			overflow: hidden;

			display: flex;
			flex-direction: column;
			flex: 2;

			border-radius: 0 0 clamp(40px, var(--fluid-size-vmin-large), 280px)
				clamp(40px, var(--fluid-size-vmin-large), 280px);
			border-left: var(--fluid-size-border-width) solid var(--theme-border-primary);
			border-bottom: var(--fluid-size-border-width) solid var(--theme-border-primary);
			border-right: var(--fluid-size-border-width) solid var(--theme-border-primary);

			width: 130%;
			margin-left: -15%;
		}

		.details {
			flex: 1;

			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: clamp(1rem, var(--fluid-size-vmin-medium), 1.25rem);
		}

		:global {
			.overview-location {
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 0.5rem;
				padding-top: 4rem;

				.header {
					color: var(--theme-text-primary-inversed);
					font-size: clamp(32px, var(--fluid-size-vmin-medium), 40px);
				}

				.description {
					color: var(--theme-text-secondary-inversed);
					font-size: clamp(16px, var(--fluid-size-vmin-medium), 20px);
					font-weight: 500;
				}
			}

			.overview-temperature {
				.value {
					font-size: 2.5rem;
					line-height: 1.2;
				}
				.label {
					font-size: 1.25rem;
				}
			}

			.overview-range {
				gap: 16px;
			}
		}
	}
</style>
