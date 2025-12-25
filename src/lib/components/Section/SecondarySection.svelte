<script lang="ts">
	import { windowOrientation } from '$lib/globals/windowStore';
	import type { Snippet } from 'svelte';
	import SectionHeading from './SectionHeading.svelte';
	import type { BackgroundGradientColor } from '../PlantScene/themes/theme.types';
	import { calculateForegroundColor } from '$lib/utilities/theme/foreground-color';
	import temperatureRangeStore from '$lib/globals/temperatureRangeStore.svelte';

	interface SecondarySectionProps {
		TopBar?: Snippet;
		heading?: string;
		subHeading?: string;
		Scene?: Snippet<[]> | undefined;
		sceneBackground?: BackgroundGradientColor;
		blurScene?: boolean;
		Content?: Snippet<[]> | undefined;
		contentHeading?: string;
	}

	let {
		TopBar,
		heading,
		subHeading,
		Scene,
		sceneBackground,
		blurScene: blurContent = false,
		Content = undefined,
		contentHeading,
	}: SecondarySectionProps = $props();

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
	const foregroundColorSecondary = $derived(
		sceneBackground &&
			calculateForegroundColor({
				temperatureRange: $currentTemperatureRange,
				backgroundColor: sceneBackground[0],
				priority: 'secondary',
			}),
	);
</script>

<section class={`secondary-section ${$orientation}`}>
	<div
		id="secondary-section-inner"
		class={`secondary-section-inner ${TopBar ? 'with-top-bar' : ''}`}
		style:background={sceneBackground &&
			`linear-gradient(to bottom, ${sceneBackground[0]}, ${sceneBackground[1]})`}
	>
		{#if $orientation === 'portrait'}
			<section class="secondary-section-inner-hidden">
				{#if TopBar}
					<nav class="secondary-section-inner-display-top-bar">
						{@render TopBar()}
					</nav>
				{/if}
				<SectionHeading
					heading={contentHeading || heading}
					{subHeading}
					headingColor={foregroundColorPrimary}
					subheadingColor={foregroundColorSecondary}
				/>
			</section>
			<section
				class="secondary-section-inner-display"
				style:backdrop-filter={blurContent ? 'blur(80px)' : 'none'}
			>
				{#if TopBar}
					<nav
						class="secondary-section-inner-display-top-bar"
						style:color={foregroundColorSecondary}
					>
						{@render TopBar()}
					</nav>
				{/if}
				<SectionHeading
					heading={contentHeading || heading}
					{subHeading}
					headingColor={foregroundColorPrimary}
					subheadingColor={foregroundColorSecondary}
				/>
				{#if contentHeading?.trim()}
					<div class="secondary-section-inner-display-content">
						{@render Content?.()}
					</div>
				{/if}
			</section>
			<section class="secondary-section-inner-scene">
				{@render Scene?.()}
			</section>
		{:else if $orientation === 'landscape'}
			<section class="secondary-section-inner-display">
				{#if TopBar}
					<div class="secondary-section-inner-display-top-bar">
						{@render TopBar()}
					</div>
				{/if}
				{#if contentHeading?.trim()}
					<div
						class="secondary-section-inner-display-content"
						style:backdrop-filter={blurContent ? 'blur(150px)' : 'none'}
					>
						<h2
							class="secondary-section-inner-display-content-heading"
							style:color={foregroundColorPrimary}
						>
							{contentHeading}
						</h2>

						{@render Content?.()}
					</div>
				{/if}
				{@render Scene?.()}
			</section>
		{/if}
	</div>
</section>

<style lang="scss">
	.secondary-section.portrait {
		// Variables
		--display-border-radius: clamp(40px, var(--fluid-size-vmin-large-plus), 280px);
		--display-border-width: clamp(3px, var(--fluid-size-vmin-small-plus), 4px);
		// --------

		position: relative;
		overflow: hidden;

		display: flex;
		flex-direction: column;
		flex: 2;

		margin-left: -15%;
		width: 130%;

		border-radius: 0 0 var(--display-border-radius) var(--display-border-radius);
		border-left: var(--display-border-width) solid var(--theme-border-primary);
		border-bottom: var(--display-border-width) solid var(--theme-border-primary);
		border-right: var(--display-border-width) solid var(--theme-border-primary);

		background-color: var(--warm-white-bg-tertiary);

		container-type: inline-size;
		font-size: clamp(16px, 2.5cqi, 40px);

		.secondary-section-inner {
			position: absolute;
			inset: 0;
			left: 50%;
			width: 100vw;
			transform: translateX(-50%);
			max-height: 100%;

			display: flex;
			flex-direction: column;

			&-hidden {
				visibility: hidden;

				display: flex;
				flex-direction: column;

				max-height: 100%;
				padding: 1rem var(--fluid-size-em-medium) 0;
			}

			&-display {
				z-index: 1;

				position: absolute;
				width: 100%;

				display: flex;
				flex-direction: column;

				max-height: 100%;
				padding: 1rem var(--fluid-size-em-medium) 0;

				&:has(.secondary-section-inner-display-content) {
					height: 100%;
				}

				&-content {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: start;

					overflow-y: auto;
					overscroll-behavior: contain;
					-webkit-overflow-scrolling: touch;

					max-height: 100%;
					min-height: 0;
					padding-left: var(--fluid-size-em-medium);
					padding-right: var(--fluid-size-em-medium);

					text-align: center;

					&:empty {
						display: none;
						pointer-events: none;
					}
				}
			}

			&-scene {
				position: relative;
				height: 100%;
			}
		}

		:global {
			.heading {
				margin: 45px 45px 0;
			}
		}

		.with-top-bar {
			:global {
				.heading {
					margin: 15px 15px 0;
				}
			}
		}
	}

	.secondary-section.landscape {
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

		top: -5%;
		height: 110%;

		border-radius: var(--display-border-radius) 0 0 var(--display-border-radius);
		border-top: var(--display-border-width) solid var(--theme-border-primary);
		border-left: var(--display-border-width) solid var(--theme-border-primary);
		border-bottom: var(--display-border-width) solid var(--theme-border-primary);

		background-color: var(--warm-white-300);

		container-type: inline-size;
		font-size: clamp(16px, 2.5cqi, 40px);

		.secondary-section-inner {
			position: absolute;
			inset: 0;
			top: 50%;
			height: 100vh;
			transform: translateY(-50%);
			width: 100%;

			display: flex;
			align-items: center;
			justify-content: center;

			&-display {
				position: relative;

				display: flex;
				flex-direction: column;

				height: 100%;
				width: 100%;

				&-top-bar {
					z-index: 2;
					position: absolute;
					top: 0;
					left: 50%;
					transform: translateX(-50%);
				}

				&-content {
					// Absolute positioning over scene
					z-index: 1;
					position: absolute;
					inset: 0;

					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					gap: 24px;

					padding: 6rem 4rem 0;

					text-align: center;

					&-heading {
						font-size: 40px;
						font-weight: bold;
						color: var(--warm-white-900);
					}
				}
			}
		}
	}
</style>
