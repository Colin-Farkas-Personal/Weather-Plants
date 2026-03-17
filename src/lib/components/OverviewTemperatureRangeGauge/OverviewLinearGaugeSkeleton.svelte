<script lang="ts">
	import Skeleton from '$lib/components/Loading/Skeleton.svelte';
</script>

<Skeleton>
	<div class="skeleton-linear-gauge wrapper">
		<div class="skeleton-label-min pill">
			<div class="skeleton-text"></div>
			<div class="skeleton-icon"></div>
		</div>
		<div class="skeleton-track"></div>
		<div class="skeleton-label-max pill">
			<div class="skeleton-icon"></div>
			<div class="skeleton-text"></div>
		</div>
	</div>
</Skeleton>

<style lang="scss">
	.skeleton-linear-gauge {
		display: flex;
		align-items: center;
		gap: 18px;
	}

	.skeleton-label-min,
	.skeleton-label-max {
		display: flex;
		align-items: center;
		gap: 0.15em;
		padding: 0.2em 0.45em;
		border: 2px solid var(--theme-border-secondary, var(--theme-border-primary));
		border-radius: 60px;
		flex-shrink: 0;
	}

	.skeleton-text {
		width: 28px;
		height: var(--fluid-size-em-mini-plus);
		border-radius: 0.375rem;
	}

	.skeleton-icon {
		width: var(--fluid-size-em-mini-plus);
		height: var(--fluid-size-em-mini-plus);
		border-radius: 50%;
	}

	.skeleton-track {
		min-width: 100px;
		width: 100%;
		height: 10px;
		border-radius: 12px;
	}
</style>
