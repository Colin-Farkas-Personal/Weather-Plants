import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/svelte';
import MainTemperature from './OverviewTemperature.svelte';

describe('<MainTemperature />', () => {
	test('renders "temperature" and "feels like" values', () => {
		const renderView = render(MainTemperature, {
			props: {
				temperature: 20.3,
				feelsLike: 21.7,
			},
		});

		const temperatureElement = renderView.getByTestId('main-temperature-temperature');
		const feelsLikeElement = renderView.getByTestId('main-temperature-feels-like');

		expect(temperatureElement.textContent).toBe('20.3°C');
		expect(feelsLikeElement.textContent).toBe('Feels like 21.7°C');
	});
});
