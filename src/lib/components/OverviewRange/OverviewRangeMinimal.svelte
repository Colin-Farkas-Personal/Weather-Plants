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
	<dd class="description" aria-label={`${ariaLabel}: ${temperatureString}`}>
		{temperatureString}
	</dd>
</div>

<style lang="scss">
	.overview-range-minimal {
		display: flex;
		gap: 0.25rem;
		align-items: center;

		.term {
			color: var(--theme-icon-secondary);
		}

		.description {
			font-size: 1em;
			font-weight: bold;
			color: var(--theme-text-secondary);
		}
	}
</style>
