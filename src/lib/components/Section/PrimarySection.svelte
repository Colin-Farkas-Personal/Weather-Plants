<script lang="ts">
	import type { Snippet } from 'svelte';
	import { windowOrientation } from '$lib/globals/windowStore';
	import SectionHeading from './SectionHeading.svelte';
	import { forecastDisplay } from '$lib/globals/forecastTimeLineStore.svelte';
	import { calculateForegroundColor } from '$lib/utilities/theme/foreground-color';
	import temperatureRangeStore from '$lib/globals/temperatureRangeStore.svelte';
	import type { BackgroundGradientColor } from '../PlantScene/themes/theme.types';

	interface PrimarySectionProps {
		TopBar?: Snippet;
		heading?: string;
		subHeading?: string;
		Content?: Snippet;
		isTimeScroll?: boolean;
		sceneBackground?: BackgroundGradientColor;
	}

	let {
		TopBar,
		heading,
		subHeading,
		Content,
		isTimeScroll,
		sceneBackground,
	}: PrimarySectionProps = $props();

	// State
	let orientation = windowOrientation;
	let currentTemperatureRange = temperatureRangeStore;

	const foregroundColorPrimary = $derived(
		sceneBackground &&
			calculateForegroundColor({
				temperatureRange: $currentTemperatureRange,
				backgroundColor: sceneBackground[0],
				priority: 'primary',
			}),
	);
</script>

<section class={`primary-section ${$orientation}`}>
	{#if TopBar && !$forecastDisplay}
		<nav class="primary-section-top-bar">
			{@render TopBar()}
		</nav>
	{/if}
	<div class={`primary-section-inner ${isTimeScroll && 'time-scroll-style'}`}>
		<SectionHeading {heading} {subHeading} headingColor={foregroundColorPrimary} />
		<div class="primary-section-body">
			{@render Content?.()}
		</div>
	</div>
</section>

<style lang="scss">
	.primary-section.portrait {
		// --fluid-size-vmin

		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0;

		container-type: inline-size;
		font-size: clamp(16px, 2.5cqi, 40px);

		.primary-section-inner {
			flex: 1;
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: clamp(1.25rem, 4.5cqi, 2.25rem) clamp(1.25rem, 2.25cqi, 3rem);
			padding-bottom: calc(
				clamp(1.25rem, 4.5cqi, 2.25rem) + env(safe-area-inset-bottom, 0.25rem)
			);
			box-sizing: border-box;

			&.time-scroll-style {
				border-radius: 40px;
				box-shadow: 0 30px 0 10px black;
				padding-bottom: none;
			}
		}

		.primary-section-body {
			width: 100%;
			display: flex;
			flex-direction: column;
			gap: clamp(0.75rem, 5cqi, 1.5rem);
		}
	}

	.primary-section.landscape {
		flex: 1;
		overflow-x: hidden;

		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		max-width: 100%;
		padding: 0;

		overflow-y: auto;
		scrollbar-color: var(--theme-border-primary) var(--theme-bg-primary);
		scrollbar-width: thin;

		container-type: inline-size;
		font-size: clamp(20px, 1.2cqi, 42px);

		.primary-section-top-bar {
			width: 100%;
			padding: clamp(2rem, 1cqi, 3rem) clamp(2rem, 4cqi, 3rem) 0;
			box-sizing: border-box;
		}

		.primary-section-inner {
			flex: 1;
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: clamp(1rem, 4cqi, 2.5rem) clamp(1rem, 8cqi, 10rem);
			gap: clamp(1rem, 3cqi, 2rem);
			box-sizing: border-box;
		}

		.primary-section-body {
			width: 100%;
			display: flex;
			flex-direction: column;
			gap: clamp(0.75rem, 2.5cqi, 1.5rem);
		}

		@media screen and (height <= 650px) {
			justify-content: start;
			.primary-section-inner {
				padding: 2rem 0;
			}
		}
	}
</style>
