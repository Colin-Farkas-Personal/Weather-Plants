<script lang="ts">
	import type { Snippet } from 'svelte';
	import { windowOrientation } from '$lib/globals/windowStore';
	import SecondarySection from '../Section/SecondarySection.svelte';
	import PrimarySection from '../Section/PrimarySection.svelte';

	interface PageLayoutProps {
		TopBar?: Snippet;
		heading: string;
		subHeading?: string;
		PrimarySectionContent: Snippet;
		SecondarySectionContent?: Snippet;
		secondarySectionHeading?: string;
		Scene?: Snippet;
		className?: string;
	}
	let {
		TopBar,
		heading,
		subHeading,
		PrimarySectionContent,
		SecondarySectionContent,
		secondarySectionHeading,
		Scene,
		className,
	}: PageLayoutProps = $props();

	// Logic
	let orientation = windowOrientation;
</script>

<main class={`page-layout ${$orientation} noise ${className}`}>
	{#if $orientation === 'portrait'}
		<SecondarySection
			{TopBar}
			heading={secondarySectionHeading || heading}
			{subHeading}
			{Scene}
			Content={SecondarySectionContent}
		/>
		<PrimarySection Content={PrimarySectionContent} />
	{:else if $orientation === 'landscape'}
		<PrimarySection {heading} {subHeading} Content={PrimarySectionContent} />
		<SecondarySection
			{Scene}
			Content={SecondarySectionContent}
			contentHeading={secondarySectionHeading}
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
