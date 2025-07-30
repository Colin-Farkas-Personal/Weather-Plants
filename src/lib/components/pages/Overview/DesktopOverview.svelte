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
	<section class="details isolate">
		<div class="noise"></div>
		<div class="overlay"></div>

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
		<PlantScene />
	</aside>
</main>

<style lang="scss">
	:root {
		--desktop-overview-display-scale: calc(1.1 - 2);
	}
	.desktop-overview {
		overflow: hidden;
		display: flex;
		height: 100vh;

		background-color: var(--theme-bg-primary);

		.details {
			flex: 1;

			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin: 0 auto;
			gap: clamp(4rem, 30vmin, 10rem);

			overflow-y: scroll;

			@media screen and (height <= 650px) {
				justify-content: start;
				padding: 2rem 0;
			}

			.details-values {
				display: inherit;
				flex-direction: inherit;
				align-items: center;
				gap: 2.625rem;
			}
		}

		.display {
			z-index: 0;
			position: relative;
			overflow: hidden;

			box-sizing: border-box;
			display: flex;
			flex: 1.75;

			border-radius: clamp(60px, 20vmin, 140px) 0 0 clamp(60px, 20vmin, 140px);
			border-top: clamp(2px, 0.5vmin, 4px) solid var(--theme-border-primary);
			border-left: clamp(2px, 0.5vmin, 4px) solid var(--theme-border-primary);
			border-bottom: clamp(2px, 0.5vmin, 4px) solid var(--theme-border-primary);
			height: 110%;
			top: -5%;
		}

		:global {
			.overview-location {
				padding-top: 0rem;

				.header {
					color: var(--theme-text-primary);
					font-weight: bold;
				}

				.description {
					color: var(--theme-text-secondary);
					font-weight: 500;
				}
			}

			.overview-range {
				gap: clamp(24px, var(--typography-font-size-vmin), 48px);
			}

			.display {
				.size-container {
					top: 0;
					height: 100%;
				}
			}
		}
	}
</style>
