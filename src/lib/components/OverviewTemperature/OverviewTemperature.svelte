<script lang="ts">
	import type { TemperatureUnit } from '$lib/types/temperature';
	import { toTemperatureUnit } from '$lib/utilities/formatted-temperature';

	let { temperature, feelsLike }: { temperature: number; feelsLike: number } = $props();

	let unitC: TemperatureUnit = 'celsius';
</script>

<hgroup class="overview-temperature">
	<p class="value">{toTemperatureUnit(temperature, unitC)}</p>
	<h2 class="label">Feels like {toTemperatureUnit(feelsLike, unitC)}</h2>
</hgroup>

<style lang="scss">
	.overview-temperature {
		text-align: center;
		
		.value {
			font-size: 2.5rem;
			font-weight: bold;
			color: white;
		}

		.label {
			font-size: 20px;
			font-weight: 500;
			color: #FFCD9B;
		}
	}
</style>
