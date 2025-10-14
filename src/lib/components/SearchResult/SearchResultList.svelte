<script lang="ts">
	import type { Snippet } from 'svelte';

	interface SearchResultList {
		children: Snippet;
	}

	let { children }: SearchResultList = $props();
</script>

<nav class="search-result-list" aria-label="Search Results">
	<ul>
		{@render children?.()}
	</ul>
</nav>

<style lang="scss">
	.search-result-list {
		padding: 0.5rem 0.5rem 5rem;
		overflow-y: auto;
		width: clamp(0px, 100%, 450px);

		ul {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: start;
			gap: 12px;

			padding: 0;
			margin: 0;

			list-style: none;
		}
	}
</style>
