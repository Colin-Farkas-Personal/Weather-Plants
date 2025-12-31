<script lang="ts">
	import type { Snippet } from 'svelte';
	import { windowOrientation } from '$lib/globals/windowStore';
	import SecondarySection from '../Section/SecondarySection.svelte';
	import PrimarySection from '../Section/PrimarySection.svelte';
	import type { BackgroundGradientColor } from '../PlantScene/themes/theme.types';

	interface SecondarySectionProps {
		TopBar?: Snippet;
		Content: Snippet;
		heading: string;
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
	}: PageLayoutProps = $props();

	const secondaryContentHeading = $derived(secondarySectionProps?.heading);
	const SecondaryContentSnippet = $derived(secondarySectionProps?.Content);
	const secondaryTopBar = $derived(secondarySectionProps?.TopBar);

	let orientation = windowOrientation;
</script>

<main class={`page-layout ${$orientation} noise ${className}`}>
	{#if $orientation === 'portrait'}
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
		}
	}
</style>
