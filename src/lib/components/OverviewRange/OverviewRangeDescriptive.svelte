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
		<span class="value" aria-label={`${ariaLabel}: ${temperatureString}`}>{temperatureString}</span>
		<span class="label">{label}</span>
	</dt>
</div>

<style lang="scss">
	.overview-range-descriptive {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1rem;

		.description {
			color: var(--theme-text-secondary);

			// TODO: Set via <Icon size="32" /> ???
			:global(svg) {
				width: clamp(24px, var(--typography-font-size-vmin), 2rem);
				height: auto;
			}
		}

		.term {
			display: inherit;
			flex-direction: inherit;
			text-align: center;

			.value {
				color: var(--theme-text-secondary);
				font-size: clamp(20px, var(--typography-font-size-vmin), 32px);
				font-weight: bold;
				line-height: 1;
			}

			.label {
				font-size: clamp(16px, var(--typography-font-size-vmin), 24px);
				font-weight: 500;
				color: var(--theme-text-secondary);
				line-height: 1.2;
			}
		}
	}
</style>
