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
		Scene?: Snippet;
		className?: string;
	}
	let {
		TopBar,
		heading,
		subHeading,
		PrimarySectionContent,
		SecondarySectionContent,
		Scene,
		className,
	}: PageLayoutProps = $props();

	// Logic
	let orientation = windowOrientation;

	console.warn('MY SNIPPET - ', SecondarySectionContent);
</script>

{#snippet PrimaryContent()}
	{@render PrimarySectionContent()}
{/snippet}
{#snippet SecondaryContent()}
	{@render SecondarySectionContent?.()}
{/snippet}

<main class={`page-layout-${$orientation} noise ${className}`}>
	{#if $orientation === 'portrait'}
		<SecondarySection {TopBar} {heading} {subHeading} {Scene} Content={SecondaryContent} />
		<PrimarySection Content={PrimaryContent} />
	{:else if $orientation === 'landscape'}
		<PrimarySection {heading} {subHeading} Content={PrimaryContent} />
		<SecondarySection {Scene} Content={SecondaryContent} />
	{/if}
</main>

<style lang="scss">
	.page-layout-portrait {
		overflow-x: hidden;
		display: flex;
		flex-direction: column;
		height: 100dvh;
	}

	.page-layout-landscape {
		overflow: hidden;
		display: flex;
		height: 100dvh;
	}
</style>
