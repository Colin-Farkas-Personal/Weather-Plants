<script lang="ts">
	import { toTemperatureUnit } from '$lib/utilities/formatted-temperature';
	import type { Component } from 'svelte';

	interface OverviewRangeMinimalProps {
		Icon: Component;
		temp: number;
	}

	let { Icon, temp }: OverviewRangeMinimalProps = $props();
</script>

<div class="overview-range-minimal">
    <dt><Icon /></dt>
    <dd>{toTemperatureUnit(temp, 'celsius')}</dd>
</div>
