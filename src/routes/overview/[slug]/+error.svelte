<!-- src/routes/+error.svelte -->
<script lang="ts">
	let { error, status }: { error: Error, status: number} = $props();
</script>

<h1>{status}</h1>
<p>{error.message}</p>

{#if status === 500}
	<p>There seems to be no temperature for {error.message}</p>
{/if}