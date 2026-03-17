<script lang="ts">
	import Skeleton from '$lib/components/Loading/Skeleton.svelte';
</script>

<Skeleton>
	<div class="skeleton-feels-like wrapper">
		<div class="skeleton-feels-like-pill"></div>
	</div>
</Skeleton>

<style lang="scss">
	.skeleton-feels-like {
		display: flex;
		align-items: center;
		justify-content: center;

		padding: var(--fluid-size-em-mini) var(--fluid-size-em-mini-plus);
		border: 3px solid var(--theme-border-secondary, var(--theme-border-primary));
		border-radius: 60px;
	}

	.skeleton-feels-like-pill {
		width: 160px;
		height: var(--fluid-size-em-medium-minus);
		border-radius: 60px;
	}
</style>
