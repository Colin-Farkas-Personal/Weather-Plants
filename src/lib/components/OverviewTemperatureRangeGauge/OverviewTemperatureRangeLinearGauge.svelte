<script lang="ts">
	import ThermometerColdBoldIcon from '~icons/ph/thermometer-cold-bold';
	import ThermometerHotBoldIcon from '~icons/ph/thermometer-hot-bold';
	import LinearGauge from '../Gauge/LinearGauge.svelte';
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

<LinearGauge {min} {max} {value} {MinContent} {MaxContent} />

<style lang="scss">
	.min,
	.max {
		display: flex;
		align-items: center;
		gap: 0.25em;
	}
</style>
