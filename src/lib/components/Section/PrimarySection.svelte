<script lang="ts">
	import type { Snippet } from 'svelte';
	import { windowOrientation } from '$lib/globals/windowStore';

	interface PrimarySectionProps {
		children?: Snippet;
	}

	let { children }: PrimarySectionProps = $props();

	// Logic
	let orientation = windowOrientation;
</script>

<section class={`primary-section-${$orientation}`}>
	{@render children?.()}
</section>

<style lang="scss">
	.primary-section-portrait {
		flex: 1;

		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: clamp(1rem, 7.5cqi, 1.5rem);

		container-type: inline-size;
		font-size: clamp(16px, 2.5cqi, 40px);
	}

	.primary-section-landscape {
		flex: 1;

		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 0 auto;
		gap: 10rem;

		overflow-y: auto;
		scrollbar-color: var(--theme-border-primary) var(--theme-bg-primary);
		scrollbar-width: thin;

		container-type: inline-size;
		font-size: clamp(16px, 1.5cqi, 48px);

		@media screen and (height <= 650px) {
			justify-content: start;
			padding: 2rem 0;
		}
	}
</style>
