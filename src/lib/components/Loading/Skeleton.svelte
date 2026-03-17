<script lang="ts">
	import type { Snippet } from 'svelte';

	interface SkeletonProps {
		children: Snippet;
	}

	let { children }: SkeletonProps = $props();
</script>

<div class="skeleton">
	{@render children()}
</div>
