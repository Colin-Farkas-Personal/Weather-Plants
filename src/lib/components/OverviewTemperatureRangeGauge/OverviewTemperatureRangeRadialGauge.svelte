<script lang="ts">
	import RadialGauge from '../Gauge/RadialGauge.svelte';
	import ThermometerColdBoldIcon from '~icons/ph/thermometer-cold-bold';
	import ThermometerHotBoldIcon from '~icons/ph/thermometer-hot-bold';
	// import ArrowCircleUpBoldIcon from '~icons/ph/arrow-circle-up-bold';

	interface OverviewTemperatureRangeGaugeProps {
		min: number;
		max: number;
		value: number;
	}
	let { min, max, value }: OverviewTemperatureRangeGaugeProps = $props();
</script>

{#snippet MinContent()}
	<span class="min">{min}°C <ThermometerColdBoldIcon /></span>
{/snippet}
{#snippet MaxContent()}
	<span class="max"><ThermometerHotBoldIcon /> {max}°C</span>
{/snippet}
{#snippet ValueContent()}
	<span class="value">{value}°C</span>
{/snippet}

<RadialGauge {min} {max} {value} {MinContent} {MaxContent} {ValueContent} />

<style lang="scss">
	.min,
	.max {
		display: flex;
		align-items: center;
		gap: 0.25em;
	}

	.value {
		display: flex;
		flex-direction: column;
		align-items: center;
		line-height: normal;

		:global(svg) {
			width: 0.75em;
			height: auto;
			color: var(--theme-text-secondary);
		}
	}
</style>
