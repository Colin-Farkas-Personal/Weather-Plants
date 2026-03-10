import { writable } from 'svelte/store';

function createForecastDisplayStore() {
	const { subscribe, update } = writable(false);

	function showDisplayStore() {
		update(() => true);

		document.addEventListener('mousedown', hideDisplayStore);
	}

	function hideDisplayStore(event: MouseEvent) {
		const forecastDisplayElement = document.getElementById('forecast-display');
		const timeScrollElement = document.getElementById('time-scroll');
		const scrollWheelElement = document.getElementById('scroll-wheel');

		if (
			(forecastDisplayElement && forecastDisplayElement.contains(event.target as Node)) ||
			(timeScrollElement && timeScrollElement.contains(event.target as Node)) ||
			(scrollWheelElement && scrollWheelElement.contains(event.target as Node))
		) {
			return;
		}

		update(() => false);

		document.removeEventListener('mousedown', hideDisplayStore);
	}

	return {
		subscribe,
		show: showDisplayStore,
		hide: hideDisplayStore,
	};
}

export const forecastDisplay = createForecastDisplayStore();
