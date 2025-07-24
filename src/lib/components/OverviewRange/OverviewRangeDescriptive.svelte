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
        gap: 18px;

        .description {
            color: #FFD7AE;

            // TODO: Set via <Icon size="32" /> ???
            :global(svg) {
                width: 2rem;
                height: 2rem;
            }
        }

        .term {
            display: inherit;
            flex-direction: inherit;
            text-align: center;

            .value {
                color: #ffcd9b;
                font-size: 2rem;
                font-weight: bold;
                line-height: 1;
            }
    
            .label {
                font-size: 1.5rem;
                font-weight: 500;
                color: #ffcd9b;
                line-height: 1.2;
            }

        }
	}
</style>
