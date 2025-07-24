<script lang="ts">
	import { toTemperatureUnit } from '$lib/utilities/formatted-temperature';
	import type { Component } from 'svelte';

	interface OverviewRangeMinimalProps {
		Icon: Component;
		temp: number;
		ariaHidden: string;
	}

	let { Icon, temp, ariaHidden }: OverviewRangeMinimalProps = $props();
</script>

<div class="overview-range-minimal">
    <dt class="term"><Icon /></dt>
	<span class="visually-hidden">{ariaHidden}</span>
    <dd class="description">{toTemperatureUnit(temp, 'celsius')}</dd>
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
