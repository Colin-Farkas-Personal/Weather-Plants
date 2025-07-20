<script lang="ts">
	import type { TemperatureUnit } from "$lib/types/temperature";
	import { toTemperatureUnit } from "$lib/utilities/formatted-weather";

    let { temperature, feelsLike}: { temperature: number, feelsLike: number} = $props();

    let unitC: TemperatureUnit = 'celsius';
</script>

<h2 data-testid="main-temperature-temperature">{toTemperatureUnit(temperature, unitC)}</h2>
<p data-testid="main-temperature-feels-like">Feels like {toTemperatureUnit(feelsLike, unitC)}</p>