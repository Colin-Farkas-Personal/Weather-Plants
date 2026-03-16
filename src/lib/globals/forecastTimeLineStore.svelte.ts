import { writable } from 'svelte/store';

function createForecastDisplayStore() {
	const { subscribe, update } = writable(false);

	function showDisplayStore() {
		update(() => true);

		document.addEventListener('mousedown', hideOnClickOutside);
		document.addEventListener('keydown', hideOnEscape);
	}

	function dismiss() {
		update(() => false);

		document.removeEventListener('mousedown', hideOnClickOutside);
		document.removeEventListener('keydown', hideOnEscape);
	}

	function hideOnClickOutside(event: MouseEvent) {
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

		dismiss();
	}

	function hideOnEscape(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			dismiss();
		}
	}

	return {
		subscribe,
		show: showDisplayStore,
		dismiss,
	};
}

export const forecastDisplay = createForecastDisplayStore();
