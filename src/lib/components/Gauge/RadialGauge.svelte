<script lang="ts">
	import type { Snippet } from 'svelte';

	const MIN_DEG = -110;
	const MAX_DEG = 110;

	interface RadialGaugeProps {
		min: number;
		MinContent?: Snippet<[]>;
		max: number;
		MaxContent?: Snippet<[]>;
		value: number;
		ValueContent?: Snippet<[]>;
	}

	let { min, MaxContent, max, MinContent, value, ValueContent }: RadialGaugeProps = $props();

	const indicatorAngle = calculateIndicatorAngle();

	function calculateIndicatorAngle(): number {
		const startDeg = MIN_DEG;
		const endDeg = MAX_DEG;
		const totalDeg = endDeg - startDeg;
		const totalRange = max - min;

		const normalisedValue = Math.min(Math.max(value, min), max);
		const valuePercent = (normalisedValue - min) / totalRange;
		const indicatorDeg = totalDeg * valuePercent;

		return startDeg + indicatorDeg;
	}
</script>

<div
	role="meter"
	aria-label="Radial Gauge"
	aria-valuemin={min}
	aria-valuemax={max}
	aria-valuenow={value}
	class="radial-gauge"
	style="
        --ring-start-angle: {MIN_DEG}deg; 
        --ring-range-angle: {MAX_DEG - MIN_DEG}deg;
    "
>
	<span class="radial-gauge-ring" aria-hidden="true">
		<span class="radial-gauge-ring-cap-start"></span>
		<span class="radial-gauge-ring-cap-end"></span>
	</span>
	<span
		class="radial-gauge-indicator"
		style="transform: rotate({indicatorAngle}deg)"
		aria-hidden="true"
	></span>
	<span class="radial-gauge-label-value">
		{#if ValueContent}
			{@render ValueContent()}
		{:else}
			{value}
		{/if}
	</span>
	<span class="radial-gauge-label-min" aria-hidden="true">
		{#if MinContent}
			{@render MinContent()}
		{:else}
			{min}
		{/if}
	</span>
	<span class="radial-gauge-label-max" aria-hidden="true">
		{#if MaxContent}
			{@render MaxContent()}
		{:else}
			{max}
		{/if}
	</span>
</div>

<style lang="scss">
	.radial-gauge {
		// --- Variables ---
		--ring-bg: var(--theme-bg-secondary);
		--ring-width: 12px;
		--cap-size: var(--ring-width);
		--indicator-size: var(--ring-width);
		// -----------------

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

			// Add mask to cut off inner part of the ring
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

		&-indicator {
			content: '';
			position: absolute;
			width: 100%;
			height: 100%;
			border-radius: 50%;

			&::after {
				content: '';
				position: absolute;
				top: 0;
				left: 50%;
				transform: translateX(-50%);
				width: var(--indicator-size);
				height: var(--indicator-size);
				background-color: var(--theme-text-primary);
				border-radius: 50%;

				box-shadow: 0 0 0 6px var(--theme-bg-primary);
			}
		}

		&-label-value {
			position: absolute;
			font-size: var(--fluid-size-em-medium-plus);
			min-width: 4ch;
			font-weight: bold;
			color: var(--theme-text-primary);
		}

		&-label-min {
			grid-area: 3 / 1 / 3 / 2;
			font-weight: bold;
			color: var(--theme-text-secondary);
		}

		&-label-max {
			grid-area: 3 / 3 / 3 / 4;
			font-weight: bold;
			color: var(--theme-text-secondary);
		}
	}
</style>
