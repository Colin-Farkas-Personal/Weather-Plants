<script lang="ts">
	import Skeleton from '$lib/components/Loading/Skeleton.svelte';

	interface SearchResultItemSkeletonProps {
		type: 'input' | 'current';
	}

	let { type }: SearchResultItemSkeletonProps = $props();
</script>

<li class="skeleton-item">
	<Skeleton>
		{#if type === 'input'}
			<div class="skeleton-card no-icon wrapper">
				<div class="skeleton-heading"></div>
				<div class="skeleton-details wrapper">
					<div class="skeleton-line"></div>
					<div class="skeleton-line short"></div>
				</div>
			</div>
		{:else}
			<div class="skeleton-card with-icon wrapper">
				<div class="skeleton-details wrapper">
					<div class="skeleton-heading"></div>
					<div class="skeleton-line"></div>
					<div class="skeleton-line short"></div>
				</div>
				<div class="skeleton-icon"></div>
			</div>
		{/if}
	</Skeleton>
</li>

<style lang="scss">
	.skeleton-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}

	.skeleton-card {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;

		width: 100%;
		padding: 20px;

		border: 2px solid var(--scene-skeleton-base, hsl(0, 0%, 82%));
		border-radius: 24px;

		&.no-icon {
			.skeleton-heading {
				width: 40%;
				height: 20px;
			}

			.skeleton-details {
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: flex-end;
				gap: 6px;
			}

			@media screen and (max-width: 350px) {
				flex-direction: column;
				justify-content: center;
				align-items: flex-start;

				.skeleton-details {
					align-items: flex-start;
				}
			}
		}

		&.with-icon {
			.skeleton-details {
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				gap: 6px;
			}

			.skeleton-heading {
				width: 55%;
				height: 20px;
			}
		}
	}

	.skeleton-line {
		width: 70%;
		height: 16px;

		&.short {
			width: 45%;
		}
	}

	.skeleton-icon {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		flex: 0 0 auto;
	}
</style>
