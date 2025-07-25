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
	:root {
		--details-color-bg: var(--theme-primary);
	}

	.mobile-overview {
		display: flex;
		flex-direction: column;
		height: 100vh;

		.display {
			display: flex;
			flex-direction: column;
			flex: 2;
		}

		.details {
			flex: 1;

			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 1.75rem;

			background-color: var(--details-color-bg);
			border-top: 2px solid var(--border-color);
		}

		:global {
			.overview-location {
				padding-top: 2rem;
				background-color: #f2d784;

				.header {
					color: #473A12;
				}

				.description {
					color: #5E4F20;
				}
			}

			.overview-condition {
				.icon svg {
					width: 1.5rem;
					height: 1.5rem;
				}

				.label {
					font-size: 1.25rem;
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
		}
	}
</style>
