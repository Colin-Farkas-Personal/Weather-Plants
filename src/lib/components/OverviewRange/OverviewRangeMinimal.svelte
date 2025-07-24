<script lang="ts">
	import { toTemperatureUnit } from '$lib/utilities/formatted-temperature';
	import type { Component } from 'svelte';

	interface OverviewRangeMinimalProps {
		Icon: Component;
		temp: number;
		ariaLabel: string;
	}

	let { Icon, temp, ariaLabel }: OverviewRangeMinimalProps = $props();

	const temperatureString = toTemperatureUnit(temp, 'celsius');
</script>

<div class="overview-range-minimal">
    <dt class="term" aria-hidden="true"><Icon /></dt>
    <dd class="description" aria-label={`${ariaLabel}: ${temperatureString}`}>{temperatureString}</dd>
</div>

<style lang="scss">
	.overview-range-minimal {
		display: flex;
		gap: .25rem;
		align-items: center;

		.term {
			color: #FFCD9B;
		}

		.description {
			font-size: 1.25rem;
			font-weight: bold;
			color: #FFCD9B;
		}
	}
</style>
