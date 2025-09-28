<script lang="ts">
	import type { Snippet } from 'svelte';

	interface SearchResultList {
		children: Snippet;
	}

	let { children }: SearchResultList = $props();
</script>

<ul class="search-result-list">
	{@render children?.()}
</ul>

<style lang="scss">
	.search-result-list {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: start;
		gap: 12px;

		padding: 0.5rem 2rem;

		overflow-y: scroll;
	}
</style>
