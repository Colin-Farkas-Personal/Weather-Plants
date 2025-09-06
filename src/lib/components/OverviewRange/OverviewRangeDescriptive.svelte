<script lang="ts">
	import { toTemperatureUnit } from '$lib/utilities/formatted-temperature';
	import type { Component } from 'svelte';

	interface OverviewRangeDescriptiveProps {
		Icon: Component;
		label: string;
		temp: number;
		ariaLabel: string;
	}

	let { Icon, label, temp, ariaLabel }: OverviewRangeDescriptiveProps = $props();

	const temperatureString = toTemperatureUnit(temp, 'celsius');
</script>

<div class="overview-range-descriptive">
	<dd class="description" aria-hidden="true"><Icon /></dd>
	<dt class="term">
		<span role="status" class="value" aria-label={`${ariaLabel}: ${temperatureString}`}
			>{temperatureString}</span
		>
		<span class="label">{label}</span>
	</dt>
</div>

<style lang="scss">
	.overview-range-descriptive {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: var(--fluid-size-em-small);

		.description {
			color: var(--theme-text-secondary);

			:global(svg) {
				width: var(--fluid-size-em-medium);
				height: auto;
			}
		}

		.term {
			display: inherit;
			flex-direction: inherit;
			text-align: center;

			.value {
				font-size: var(--fluid-size-em-small-plus);
				font-weight: bold;
				line-height: 1;
				color: var(--theme-text-secondary);
			}

			.label {
				font-size: var(--fluid-size-em-small);
				font-weight: 500;
				line-height: 1.2;
				color: var(--theme-text-secondary);
			}
		}
	}
</style>
