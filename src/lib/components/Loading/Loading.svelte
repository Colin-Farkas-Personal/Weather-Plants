<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';

	interface LoadingProps {
		data: Promise<T>;
		skeleton: Snippet;
		loaded: Snippet<[T]>;
	}

	let { data, skeleton, loaded }: LoadingProps = $props();
</script>

{#await data}
	<div aria-live="polite" aria-busy="true" style="display: contents;">
		{@render skeleton()}
	</div>
{:then resolvedData}
	<div aria-live="polite" style="display: contents;">
		{@render loaded(resolvedData)}
	</div>
{/await}
