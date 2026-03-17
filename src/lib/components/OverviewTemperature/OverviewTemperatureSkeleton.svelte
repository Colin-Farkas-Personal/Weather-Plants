<script lang="ts">
	import Skeleton from '$lib/components/Loading/Skeleton.svelte';
</script>

<Skeleton>
	<div class="skeleton-temperature wrapper">
		<div class="skeleton-value"></div>
		<div class="skeleton-label"></div>
	</div>
</Skeleton>

<style lang="scss">
	.skeleton-temperature {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--fluid-size-em-mini);
	}

	.skeleton-value {
		width: 70px;
		height: var(--fluid-size-em-medium-plus);
		border-radius: 0.5rem;
	}

	.skeleton-label {
		width: 120px;
		height: var(--fluid-size-em-small-plus);
		border-radius: 0.5rem;
	}
</style>
