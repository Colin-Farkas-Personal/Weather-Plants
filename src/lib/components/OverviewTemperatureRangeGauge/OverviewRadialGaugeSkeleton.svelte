<script lang="ts">
	import Skeleton from '$lib/components/Loading/Skeleton.svelte';

	const MIN_DEG = -110;
	const MAX_DEG = 110;
</script>

<Skeleton>
	<div
		class="skeleton-radial-gauge wrapper"
		style="
			--ring-start-angle: {MIN_DEG}deg;
			--ring-range-angle: {MAX_DEG - MIN_DEG}deg;
		"
	>
		<span class="skeleton-radial-gauge-ring wrapper">
			<span class="skeleton-radial-gauge-ring-cap-start wrapper"></span>
			<span class="skeleton-radial-gauge-ring-cap-end wrapper"></span>
		</span>
		<div class="skeleton-radial-gauge-value"></div>
		<div class="skeleton-radial-gauge-min"></div>
		<div class="skeleton-radial-gauge-max"></div>
	</div>
</Skeleton>

<style lang="scss">
	.skeleton-radial-gauge {
		--ring-bg: var(--scene-skeleton-base, hsl(0, 0%, 82%));
		--ring-width: 12px;
		--cap-size: var(--ring-width);

		position: relative;
		flex: 1;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(3, 1fr);
		align-items: center;
		justify-items: center;

		min-height: 160px;
		height: 160px;
		width: auto;
		aspect-ratio: 1 / 1;

		margin-bottom: -20px;

		&-ring {
			position: relative;
			grid-area: 1 / 1 / 4 / 4;
			width: 100%;
			height: 100%;
			border-radius: 50%;

			background: conic-gradient(
					from var(--ring-start-angle),
					var(--ring-bg) var(--ring-range-angle),
					#0000 0deg
				)
				border-box;

			-webkit-mask: radial-gradient(
				circle at center,
				transparent calc(70.5% - var(--ring-width)),
				black 0
			);
			mask: radial-gradient(
				circle at center,
				transparent calc(70.5% - var(--ring-width)),
				black 0
			);

			&-cap-start {
				content: '';
				position: absolute;
				width: 100%;
				height: 100%;
				transform: rotate(var(--ring-start-angle));

				&::after {
					content: '';
					position: absolute;
					top: 0;
					left: 50%;
					transform: translateX(-50%);
					width: var(--cap-size);
					height: var(--cap-size);
					background-color: var(--ring-bg);
					border-radius: 50%;
				}
			}

			&-cap-end {
				content: '';
				position: absolute;
				width: 100%;
				height: 100%;
				transform: rotate(calc(var(--ring-start-angle) + var(--ring-range-angle)));

				&::after {
					content: '';
					position: absolute;
					top: 0;
					left: 50%;
					transform: translateX(-50%);
					width: var(--cap-size);
					height: var(--cap-size);
					background-color: var(--ring-bg);
					border-radius: 50%;
				}
			}
		}

		&-value {
			position: absolute;
			width: 70px;
			height: var(--fluid-size-em-medium-plus);
			border-radius: 0.5rem;
		}

		&-min {
			grid-area: 3 / 1 / 3 / 2;
			width: 48px;
			height: var(--fluid-size-em-small-plus);
			border-radius: 60px;
		}

		&-max {
			grid-area: 3 / 3 / 3 / 4;
			width: 48px;
			height: var(--fluid-size-em-small-plus);
			border-radius: 60px;
		}
	}
</style>
