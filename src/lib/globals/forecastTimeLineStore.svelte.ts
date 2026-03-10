import { setScreenBackgroundColor } from '$lib/utilities/main-screen-background';
import { writable } from 'svelte/store';

function createForecastDisplayStore() {
	const { subscribe, update } = writable(false);

	function showDisplayStore() {
		update(() => true);

		setScreenBackgroundColor('#000000');
		document.addEventListener('mousedown', hideDisplayStore);
	}

	function hideDisplayStore(event: MouseEvent) {
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
		subscribe,
		show: showDisplayStore,
		hide: hideDisplayStore,
	};
}

export const forecastDisplay = createForecastDisplayStore();
