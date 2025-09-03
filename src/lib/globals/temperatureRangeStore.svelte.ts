import type { TemperatureRange } from '$lib/types/temperature';
import { temperatureToRange } from '$lib/utilities/temperature-to-range';
import { writable } from 'svelte/store';

function createTemperatureRangeStore() {
	const { update, subscribe } = writable<TemperatureRange | null>();

	function setRange(temp: number) {
		const themeRange = temperatureToRange(temp);

		update(() => themeRange);
	}

	return { subscribe, setRange };
}

const temperatureRangeStore = createTemperatureRangeStore();

export default temperatureRangeStore;
