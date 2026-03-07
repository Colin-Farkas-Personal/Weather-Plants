// src/lib/stores/counterStore.js
import { writable } from 'svelte/store';

function createForecastDisplayStore() {
	// start with 0
	const { subscribe, update } = writable(false);

	function showDisplayStore() {
		console.warn('SHOW IT!');
		update(() => true);

		document.addEventListener('mousedown', hideDisplayStore);
	}

	function hideDisplayStore(event: MouseEvent) {
		console.warn('HIDE IT!');

		// Return early if click is within ForecastDisplay or ScrollWheel
		const forecastDisplayElement = document.getElementById('forecast-display');
		const scrollWheelElement = document.getElementById('scroll-wheel');

		if (
			(forecastDisplayElement && forecastDisplayElement.contains(event.target as Node)) ||
			(scrollWheelElement && scrollWheelElement.contains(event.target as Node))
		) {
			return;
		}

		update(() => false);

		document.removeEventListener('mousedown', hideDisplayStore);
	}

	return {
		// expose subscribe so $counter works in components
		subscribe,

		// custom methods instead of exposing set/update directly
		show: showDisplayStore,
		hide: hideDisplayStore,
	};
}

// export ONE instance of this store
export const forecastDisplay = createForecastDisplayStore();
