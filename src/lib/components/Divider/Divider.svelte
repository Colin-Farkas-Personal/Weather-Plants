<script lang="ts">
	interface DividerProps {
		type: 'bull' | 'line';
	}
	let { type }: DividerProps = $props();
</script>

{#if type === 'bull'}
	<span class="bull"></span>
{:else if type === 'line'}
	<hr class="line" />
{/if}

<style lang="scss">
	.bull {
        background-color: #F4BD92;
        width: 6px;
        height: 6px;
        border-radius: 50%;
    }
</style>
