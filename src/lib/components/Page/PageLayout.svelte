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
		ForecastDisplay,
	}: PageLayoutProps = $props();

	const secondaryContentHeading = $derived(secondarySectionProps?.heading);
	const SecondaryContentSnippet = $derived(secondarySectionProps?.Content);
	const secondaryTopBar = $derived(secondarySectionProps?.TopBar);
	const secondaryBottomContent = $derived(secondarySectionProps?.BottomContent);

	let orientation = windowOrientation;

	$effect(() => {
		console.log('FORECAST', $forecastDisplay);
	});
</script>

<main id="page-layout" class={`page-layout ${$orientation} noise ${className}`}>
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
		<PrimarySection Content={PrimarySectionContent} />
	{:else if $orientation === 'landscape'}
		<!-- Landscape: Primary first with page heading; secondary has only its content heading -->
		<PrimarySection
			{heading}
			{subHeading}
			Content={PrimarySectionContent}
			TopBar={MainTopBar}
		/>
		<SecondarySection
			TopBar={secondaryTopBar}
			contentHeading={secondaryContentHeading}
			{Scene}
			{sceneBackground}
			{showNightStars}
			{blurScene}
			Content={SecondaryContentSnippet}
			BottomContent={secondaryBottomContent}
			{ForecastDisplay}
		/>
	{/if}
</main>

<style lang="scss">
	.page-layout {
		background-color: var(--theme-bg-primary);

		&.portrait {
			overflow-x: hidden;
			display: flex;
			flex-direction: column;
			height: 100dvh;
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
					0 0 0 100px black,
					inset 0 0 0 14px black;
				border-radius: 40px;

				pointer-events: none;
			}
		}
	}

	.forecast-display {
		display: flex;
		align-items: center;
		justify-content: center;

		padding: 16px 24px;

		background-color: black;

		animation: growFromTop 640ms
			linear(
				0,
				0.007 1.3%,
				0.028 2.7%,
				0.116 5.9%,
				0.231 8.9%,
				0.609 17.8%,
				0.802 23.4%,
				0.875 26.1%,
				0.933 28.8%,
				0.98 31.6%,
				1.017 34.6%,
				1.052 39.8%,
				1.062 45.9%,
				1.004 74%,
				1
			);
	}

	@keyframes growFromTop {
		from {
			height: 0;
		}
		to {
			height: max-content;
		}
	}
</style>
