<script lang="ts">
	import type { Snippet } from 'svelte';
	import { windowOrientation } from '$lib/globals/windowStore';
	import SecondarySection from '../Section/SecondarySection.svelte';
	import PrimarySection from '../Section/PrimarySection.svelte';
	import type { BackgroundGradientColor } from '../PlantScene/themes/theme.types';
	import { forecastDisplay } from '$lib/globals/forecastTimeLineStore.svelte';
	import { fly } from 'svelte/transition';

	interface PrimarySectionProps {
		Content: Snippet;
		isBackgroundDynamic?: boolean;
	}

	interface SecondarySectionProps {
		TopBar?: Snippet;
		Content?: Snippet;
		heading?: string;
		BottomContent?: Snippet<[]> | undefined;
	}

	interface PageLayoutProps {
		MainTopBar?: Snippet;
		heading: string;
		subHeading?: string;
		PrimarySectionProps: PrimarySectionProps;
		secondarySectionProps?: SecondarySectionProps;
		Scene?: Snippet;
		showNightStars: boolean;
		sceneBackground?: BackgroundGradientColor;
		blurScene?: boolean;
		className?: string;
		ForecastScroll?: Snippet<[]> | undefined;
		ForecastDisplay?: Snippet<[]> | undefined;
	}

	let {
		MainTopBar,
		heading,
		subHeading,
		PrimarySectionProps,
		secondarySectionProps,
		Scene,
		showNightStars,
		sceneBackground,
		blurScene,
		className,
		ForecastScroll,
		ForecastDisplay,
	}: PageLayoutProps = $props();

	const primarySectionSceneBackground = $derived.by(() => {
		if (PrimarySectionProps.isBackgroundDynamic) {
			return sceneBackground;
		}
		return undefined;
	});
	const secondaryContentHeading = $derived(secondarySectionProps?.heading);
	const SecondaryContentSnippet = $derived(secondarySectionProps?.Content);
	const secondaryTopBar = $derived(secondarySectionProps?.TopBar);
	const secondaryBottomContent = $derived(secondarySectionProps?.BottomContent);
	const isTimeScroll = $derived(!!ForecastScroll);

	let orientation = windowOrientation;
</script>

<main
	id="page-layout"
	class={`page-layout ${$orientation} noise ${className} ${$forecastDisplay ? 'forecast-display-active' : ''}`}
>
	{#if $orientation === 'portrait'}
		{#if $forecastDisplay}
			<div
				id="forecast-display"
				class="forecast-display"
				out:fly={{ y: -100, duration: 180, opacity: 1 }}
			>
				{@render ForecastDisplay?.()}
			</div>
		{/if}
		<!-- Portrait: Secondary section shown first, uses page heading + its own content heading -->
		<SecondarySection
			TopBar={secondaryTopBar || MainTopBar}
			{heading}
			{subHeading}
			{Scene}
			contentHeading={secondaryContentHeading}
			Content={SecondaryContentSnippet}
			{sceneBackground}
			{showNightStars}
			{blurScene}
			BottomContent={secondaryBottomContent}
		/>
		<PrimarySection Content={PrimarySectionProps.Content} {isTimeScroll} />
		{#if isTimeScroll}
			<div id="time-scroll" class="time-scroll">
				{@render ForecastScroll?.()}
			</div>
		{/if}
	{:else if $orientation === 'landscape'}
		<!-- Landscape: Primary first with page heading; secondary has only its content heading -->
		<PrimarySection
			{heading}
			{subHeading}
			Content={PrimarySectionProps.Content}
			TopBar={MainTopBar}
			{isTimeScroll}
			sceneBackground={primarySectionSceneBackground}
		/>
		<SecondarySection
			TopBar={secondaryTopBar}
			contentHeading={secondaryContentHeading}
			{Scene}
			{sceneBackground}
			{showNightStars}
			{blurScene}
			Content={SecondaryContentSnippet}
			BottomContent={ForecastScroll ?? secondaryBottomContent}
			{ForecastDisplay}
		/>
	{/if}
</main>

<style lang="scss">
	.page-layout {
		&.portrait {
			position: relative;
			overflow-x: hidden;
			display: flex;
			flex-direction: column;
			height: 100dvh;

			.forecast-display {
				z-index: 10;
				position: absolute;
				top: -4px; // Prevents a tiny gap between the forecast display and the top of the screen during the fly-in animation
				left: 0;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;

				padding: calc(1rem + 4px) 24px 1rem; // default for desktop

				background-color: black;

				animation: slide-in-top 420ms
					linear(
						0,
						0.007 1.3%,
						0.028 2.7%,
						0.112 5.8%,
						0.224 8.8%,
						0.594 17.7%,
						0.786 23.4%,
						0.856 26.1%,
						0.916 28.9%,
						0.964 31.8%,
						1 34.8%,
						1.038 40.4%,
						1.05 47%,
						1.005 75.3%,
						1
					);
			}

			.time-scroll {
				z-index: 5;
				display: flex;
				align-items: center;
				justify-content: center;

				width: 100%;

				padding: 10px;
				padding-bottom: calc(8px + env(safe-area-inset-bottom, 0.25rem));

				background-color: black;
			}
		}

		&.landscape {
			overflow: hidden;
			display: flex;
			height: 100dvh;

			&.forecast-display-active::after {
				content: '';
				position: absolute;
				inset: 0;

				box-shadow:
					0 0 0 100px hsl(0, 0%, 0%),
					inset 0 0 0 14px hsl(0, 0%, 0%);
				border-radius: 60px;

				pointer-events: none;

				animation: grow-shadow 180ms ease-out;
			}
		}
	}

	@media (hover: none) and (pointer: coarse) {
		.page-layout.portrait .forecast-display {
			padding: 4px 24px 1rem; // real mobile devices
		}
	}

	@keyframes slide-in-top {
		from {
			transform: translateY(-100%);
		}
		to {
			transform: translateY(0);
		}
	}

	@keyframes slide-out-top {
		from {
			transform: translateY(0);
		}
		to {
			transform: translateY(-100%);
		}
	}

	@keyframes grow-shadow {
		from {
			box-shadow:
				0 0 0 0px black,
				inset 0 0 0 0px black;
		}
		to {
			box-shadow:
				0 0 0 100px black,
				inset 0 0 0 14px black;
		}
	}
</style>
