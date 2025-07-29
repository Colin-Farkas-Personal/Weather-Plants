<script lang="ts">
	
	let { children } = $props();
</script>

<dl role="group" class="overview-range">
    {@render children?.()}
</dl>

<style lang="scss">
	.overview-range {
        display: flex;
        align-items: center;
        justify-content: center;
	}
</style>