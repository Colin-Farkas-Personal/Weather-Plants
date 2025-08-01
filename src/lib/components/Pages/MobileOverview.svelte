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

			border-radius: 0 0 clamp(60px, 20vmin, 140px) clamp(60px, 20vmin, 140px);
			border-left: clamp(2px, 0.5vmin, 4px) solid var(--theme-border-primary);
			border-bottom: clamp(2px, 0.5vmin, 4px) solid var(--theme-border-primary);
			border-right: clamp(2px, 0.5vmin, 4px) solid var(--theme-border-primary);

			width: 110%;
			margin-left: -5%;
		}

		.details {
			flex: 1;

			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: clamp(1rem, var(--typography-font-size-vmin), 1.75rem);
		}

		:global {
			.display {
				.size-container {
					width: 100%;
				}
			}
			.overview-location {
				padding-top: 2rem;
				background-color: var(--theme-text-bg-inversed);

				.header {
					color: var(--theme-text-primary-inversed);
				}

				.description {
					color: var(--theme-text-secondary-inversed);
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
