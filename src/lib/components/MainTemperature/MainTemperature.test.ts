import { describe, expect, test } from "vitest";
import { render } from '@testing-library/svelte';
import MainTemperature from './MainTemperature.svelte';
    
    
    describe('<MainTemperature />', () => {
        test('renders "temperature" and "feels like" values', () => {
            const temperatureMock = '20°C';
            const feelsLikeMock = '18°C';

            const renderView = render(MainTemperature, {
                props: {
                    temperature: temperatureMock,
                    feelsLike: feelsLikeMock,
                }
            });
    
            const temperatureElement = renderView.getByTestId('main-temperature-temperature');
            const feelsLikeElement = renderView.getByTestId('main-temperature-feels-like');
    
            expect(temperatureElement.textContent).toBe(temperatureMock);
            expect(feelsLikeElement.textContent).toBe(`Feels like ${feelsLikeMock}`); 
        });
    });