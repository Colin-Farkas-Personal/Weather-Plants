<script lang="ts">
	import Skeleton from '$lib/components/Loading/Skeleton.svelte';
</script>

<Skeleton>
	<div class="skeleton-condition-pill"></div>
</Skeleton>

<style lang="scss">
	.skeleton-condition-pill {
		width: clamp(120px, 30cqi, 180px);
		height: 44px;
		border-radius: var(--fluid-size-em-large-plus);
	}
</style>
