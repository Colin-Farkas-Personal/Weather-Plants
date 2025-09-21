<script lang="ts">
	import { windowOrientation } from '$lib/globals/windowStore';
	import type { Snippet } from 'svelte';
	import SectionHeading from './SectionHeading.svelte';

	interface SecondarySectionProps {
		TopBar?: Snippet;
		heading?: string;
		subHeading?: string;
		Scene?: Snippet;
	}

	let { TopBar, heading, subHeading, Scene }: SecondarySectionProps = $props();

	// Logic
	let orientation = windowOrientation;
</script>

<section class={`secondary-section-${$orientation}`}>
	<div
		id="secondary-section-inner"
		class={`secondary-section-inner ${TopBar ? 'with-top-bar' : ''}`}
	>
		{@render TopBar?.()}
		<SectionHeading {heading} {subHeading} />
		{@render Scene?.()}
	</div>
</section>

<style lang="scss">
	.secondary-section-portrait {
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

		background-color: var(--warm-white-300);

		container-type: inline-size;
		font-size: clamp(16px, 2.5cqi, 40px);

		.secondary-section-inner {
			position: absolute;
			inset: 0;
			left: 50%;
			width: 100vw;
			transform: translateX(-50%);
			height: 100%;

			display: flex;
			flex-direction: column;
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

	.secondary-section-landscape {
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
		}
	}
</style>
