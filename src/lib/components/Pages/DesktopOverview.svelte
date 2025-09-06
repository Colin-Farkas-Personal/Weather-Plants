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

<main class="desktop-overview isolate">
	<div class="noise"></div>
	<div class="overlay"></div>

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
		<PlantScene />
	</aside>
</main>

<style lang="scss">
	.desktop-overview {
		overflow: hidden;
		display: flex;
		height: 100dvh;

		.details {
			flex: 1;

			position: relative;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin: 0 auto;
			gap: clamp(4rem, var(--fluid-size-vmin-large), 10rem);

			overflow-y: auto;
			scrollbar-color: var(--theme-border-primary) var(--theme-bg-primary);
			scrollbar-width: thin;

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
			// Variables
			--display-border-radius: clamp(60px, var(--fluid-size-vmin-large), 140px);
			--display-border-width: clamp(3px, var(--fluid-size-vmin-small-plus), 4px);
			// --------

			z-index: 0;
			position: relative;
			overflow: hidden;

			box-sizing: border-box;
			display: flex;
			flex: 1.75;

			border-radius: var(--display-border-radius) 0 0 var(--display-border-radius);
			border-top: var(--display-border-width) solid var(--theme-border-primary);
			border-left: var(--display-border-width) solid var(--theme-border-primary);
			border-bottom: var(--display-border-width) solid var(--theme-border-primary);
			height: 110%;
			top: -5%;
		}

		:global {
			.overview-location {
				padding-top: 0rem;

				.header {
					color: var(--theme-text-primary);
					font-size: clamp(32px, var(--fluid-size-vmin-medium), 48px);
					font-weight: bold;
				}

				.description {
					color: var(--theme-text-secondary);
					font-size: clamp(24px, var(--fluid-size-vmin-medium), 28px);
					font-weight: 500;
				}
			}

			.overview-range {
				gap: clamp(24px, var(--fluid-size-vmin-medium), 48px);
			}
		}
	}
</style>
