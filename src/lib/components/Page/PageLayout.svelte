<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { windowOrientation } from '$lib/globals/windowStore';
	import SecondarySection from '../Section/SecondarySection.svelte';
	import PrimarySection from '../Section/PrimarySection.svelte';
	import { on } from 'events';

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
		className?: string;
	}

	let {
		MainTopBar,
		heading,
		subHeading,
		PrimarySectionContent,
		secondarySectionProps,
		Scene,
		className,
	}: PageLayoutProps = $props();

	const secondaryContentHeading = $derived(secondarySectionProps?.heading);
	const SecondaryContentSnippet = $derived(secondarySectionProps?.Content);
	const secondaryTopBar = $derived(secondarySectionProps?.TopBar);

	let orientation = windowOrientation;

	onMount(() => {
		// Trigger initial orientation check
		const isStandalone =
			window.matchMedia('(display-mode: standalone)').matches ||
			(window.navigator as Navigator).standalone === true; // iOS fallback
		console.log('Standalone?', isStandalone);
	});
</script>

<main class={`page-layout ${$orientation} noise ${className}`}>
	<h1>{isStandalone}</h1>
	{#if $orientation === 'portrait'}
		<!-- Portrait: Secondary section shown first, uses page heading + its own content heading -->
		<SecondarySection
			TopBar={secondaryTopBar || MainTopBar}
			{heading}
			{subHeading}
			{Scene}
			contentHeading={secondaryContentHeading}
			Content={SecondaryContentSnippet}
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
