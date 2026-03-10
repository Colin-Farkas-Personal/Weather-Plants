<script lang="ts">
	import type { Snippet } from 'svelte';
	import { windowOrientation } from '$lib/globals/windowStore';
	import SecondarySection from '../Section/SecondarySection.svelte';
	import PrimarySection from '../Section/PrimarySection.svelte';
	import type { BackgroundGradientColor } from '../PlantScene/themes/theme.types';
	import { forecastDisplay } from '$lib/globals/forecastTimeLineStore.svelte';

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
		PrimarySectionContent: Snippet;
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
		PrimarySectionContent,
		secondarySectionProps,
		Scene,
		showNightStars,
		sceneBackground,
		blurScene,
		className,
		ForecastScroll,
		ForecastDisplay,
	}: PageLayoutProps = $props();

	const secondaryContentHeading = $derived(secondarySectionProps?.heading);
	const SecondaryContentSnippet = $derived(secondarySectionProps?.Content);
	const secondaryTopBar = $derived(secondarySectionProps?.TopBar);
	const secondaryBottomContent = $derived(secondarySectionProps?.BottomContent);
	const isTimeScroll = $derived(!!ForecastScroll);

	let orientation = windowOrientation;

	$effect(() => {
		console.log('FORECAST', $forecastDisplay);
	});
</script>

<main
	id="page-layout"
	class={`page-layout ${$orientation} noise ${className} ${$forecastDisplay ? 'forecast-display-active' : ''}`}
>
	{#if $orientation === 'portrait'}
		{#if $forecastDisplay}
			<div id="forecast-display" class="forecast-display">
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
		<PrimarySection Content={PrimarySectionContent} {isTimeScroll} />
		{#if isTimeScroll}
			<div class="time-scroll">
				{@render ForecastScroll?.()}
			</div>
		{/if}
	{:else if $orientation === 'landscape'}
		<!-- Landscape: Primary first with page heading; secondary has only its content heading -->
		<PrimarySection
			{heading}
			{subHeading}
			Content={PrimarySectionContent}
			TopBar={MainTopBar}
			{isTimeScroll}
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
			overflow-x: hidden;
			display: flex;
			flex-direction: column;
			height: 100dvh;

			:last-child {
				background-color: inherit;
				padding-bottom: env(safe-area-inset-bottom, 0px);
			}

			.time-scroll {
				z-index: 5;
				display: flex;
				align-items: center;
				justify-content: center;

				padding: calc(16px + env(safe-area-inset-bottom, 0px));

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

	.forecast-display {
		display: flex;
		align-items: center;
		justify-content: center;

		padding: 16px 24px;

		background-color: black;
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
