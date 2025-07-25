<script lang="ts">
	import Divider from '$lib/components/Divider/Divider.svelte';
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

<main class="desktop-overview">
	<section class="details">
		<OverviewLocation locationName={data.location.name} countryName={data.location.country} />

		<div class="details-values">
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
		</div>
	</section>

	<aside class="display">
		<PlantScene temperature={data.temperature} variant="desktop" />
	</aside>
</main>

<style lang="scss">
	.desktop-overview {
		display: flex;
		height: 100vh;

		background-color: #e28439;

		.details {
			flex: 1;

			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin: 0 auto;
			gap: 10rem;

			border-right: 4px solid #ae652c;

			.details-values {
				display: inherit;
				flex-direction: inherit;
				align-items: center;
				gap: 2.625rem;
			}
		}

		.display {
			display: flex;
			flex: 1.5;
		}

		:global {
			.overview-location {
				padding-top: 0rem;

				.header {
					color: white;
					font-size: 3rem;
					font-weight: bold;
				}

				.description {
					color: #ffd7ae;
					font-size: 2rem;
					font-weight: 500;
				}
			}

			.overview-condition {
				.icon svg {
					width: 32px;
					height: 32px;
				}

				.label {
					font-size: 32px;
				}
			}

			.overview-temperature {
				.value {
					font-size: 48px;
					line-height: 1.2;
				}
				.label {
					font-size: 2rem;
				}
			}

			.overview-range {
				gap: 42px;
			}
		}
	}
</style>
