<script lang="ts">
	import type { Snippet } from 'svelte';

	const TRACK_SIZE = 10;

	interface LinearGaugeProps {
		min: number;
		MinContent?: Snippet<[]>;
		max: number;
		MaxContent?: Snippet<[]>;
		value: number;
	}

	let { min, MaxContent, max, MinContent, value }: LinearGaugeProps = $props();

	function calculateIndicatorPosition(): string {
		const totalRange = max - min;
		const normalisedValue = Math.min(Math.max(value, min), max);
		const valuePercent = (normalisedValue - min) / totalRange;

		const trackWidth = 100;
		const indicatorLeftOffset = trackWidth * valuePercent;
		const indicatorHalfSize = TRACK_SIZE / 2;

		return `calc(${indicatorLeftOffset}% - ${indicatorHalfSize}px)`;
	}
</script>

<div
	role="meter"
	aria-label="Linear Gauge"
	aria-valuemin={min}
	aria-valuemax={max}
	aria-valuenow={value}
	class="linear-gauge"
>
	<span class="linear-gauge-label-min">
		{#if MinContent}
			{@render MinContent()}
		{:else}
			{min}
		{/if}
	</span>
	<div class="linear-gauge-track" style={`--track-size: ${TRACK_SIZE}px`} aria-hidden="true">
		<span
			class="linear-gauge-indicator"
			style="left: {calculateIndicatorPosition()}"
			aria-hidden="true"
		></span>
	</div>
	<span class="linear-gauge-label-max">
		{#if MaxContent}
			{@render MaxContent()}
		{:else}
			{max}
		{/if}
	</span>
</div>

<style lang="scss">
	.linear-gauge {
		position: relative;
		display: flex;
		align-items: center;
		gap: 18px;

		&-track {
			position: relative;

			min-width: 100px;
			height: var(--track-size);

			background-color: var(--theme-bg-secondary);
			border-radius: 12px;
		}

		&-indicator {
			--indicator-size: var(--track-size);

			z-index: 1;
			position: absolute;
			top: 0;
			left: 0;

			width: var(--indicator-size);
			aspect-ratio: 1 / 1;

			background-color: var(--theme-text-primary);
			border-radius: 50%;
			box-shadow: 0 0 0 4px var(--theme-bg-primary);
		}

		&-label-min,
		&-label-max {
			font-size: var(--fluid-size-em-medium-minus);
			font-weight: bold;
			color: var(--theme-text-secondary);
		}
	}
</style>
