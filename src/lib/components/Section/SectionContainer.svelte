<script lang="ts">
	import type { Snippet } from 'svelte';
	import { windowOrientation } from '$lib/globals/windowStore';

	interface SectionContainerProps {
		className?: string;
		children?: Snippet;
	}

	let { className, children }: SectionContainerProps = $props();

	// Logic
	let orientation = windowOrientation;
</script>

<main class={[`section-container-${$orientation}`, 'noise', className]}>
	{@render children?.()}
</main>

<style lang="scss">
	.section-container-portrait {
		overflow-x: hidden;
		display: flex;
		flex-direction: column;
		height: 100dvh;
	}

	.section-container-landscape {
		overflow: hidden;
		display: flex;
		height: 100dvh;
	}
</style>
