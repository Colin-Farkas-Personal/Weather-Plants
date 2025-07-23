<script lang="ts">
	import type { TemperatureUnit } from '$lib/types/temperature';
	import { toTemperatureUnit } from '$lib/utilities/formatted-temperature';

	let { temperature, feelsLike }: { temperature: number; feelsLike: number } = $props();

	let unitC: TemperatureUnit = 'celsius';
</script>

<hgroup class="overview-temperature">
	<p data-testid="main-temperature-temperature">{toTemperatureUnit(temperature, unitC)}</p>
	<h2 data-testid="main-temperature-feels-like">Feels like {toTemperatureUnit(feelsLike, unitC)}</h2>
</hgroup>

<style lang="scss">
	.overview-temperature {
		text-align: center;
	}
</style>
