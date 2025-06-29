import { describe, expect, test } from "vitest";
import { render } from '@testing-library/svelte';
import MainTemperature from './MainTemperature.svelte';
    
    
    describe('<MainTemperature />', () => {
        test('renders "temperature" and "feels like" values', () => {
            const renderView = render(MainTemperature, {
                props: {
                    temperature: 20,
                    feelsLike: 18,
                }
            });
    
            const temperatureElement = renderView.getByTestId('main-temperature-temperature');
            const feelsLikeElement = renderView.getByTestId('main-temperature-feels-like');
    
            expect(temperatureElement.textContent).toBe('20°C');
            expect(feelsLikeElement.textContent).toBe('Feels like 18°C'); 
        });
    });