<script lang="ts">
	import type { Snippet } from 'svelte';
	import { windowOrientation } from '$lib/globals/windowStore';
	import SectionHeading from './SectionHeading.svelte';

	interface PrimarySectionProps {
		TopBar?: Snippet;
		heading?: string;
		subHeading?: string;
		Content?: Snippet;
	}

	let { TopBar, heading, subHeading, Content }: PrimarySectionProps = $props();

	// Logic
	let orientation = windowOrientation;
</script>

<section class={`primary-section ${$orientation}`}>
	{#if TopBar}
		<nav class="primary-section-top-bar">
			{@render TopBar()}
		</nav>
	{/if}
	<div class="primary-section-inner">
		<SectionHeading {heading} {subHeading} />
		<div class="primary-section-body">
			{@render Content?.()}
		</div>
	</div>
</section>

<style lang="scss">
	.primary-section.portrait {
		// --fluid-size-vmin

		flex: 1;

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
			padding: clamp(1.25rem, 8cqi, 2.25rem) clamp(1.25rem, 8cqi, 3rem);
			gap: clamp(1rem, 7.5cqi, 1.75rem);
			box-sizing: border-box;
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
		font-size: clamp(20px, 1.5cqi, 48px);

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
