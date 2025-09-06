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
			font-weight: bold;
			font-size: clamp(40px, var(--fluid-size-vmin-medium), 48px);
			color: var(--theme-text-primary);
		}

		.label {
			font-weight: 500;
			font-size: clamp(20px, var(--fluid-size-vmin-medium), 32px);
			color: var(--theme-text-secondary);
		}
	}
</style>
