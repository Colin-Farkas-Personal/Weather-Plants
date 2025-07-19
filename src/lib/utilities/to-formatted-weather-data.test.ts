import { describe, expect, test } from 'vitest';
import { toFormattedWeatherData } from './to-formatted-weather-data';

describe('toFormattedWeatherData()', () => {
  test('given celcius, returns an object with temperature values as strings with °C', () => {
    const data = {
      temperature_tempC: 20.2,
      feelsLike_tempC: 18.8,
      dailyRange: {
        min_tempC: 15.5,
        max_tempC: 25.5,
      },
    };

    const expected = {
      temperature: '20.2°C',
      feelsLike: '18.8°C',
      dailyRange: {
        min: '15.5°C',
        max: '25.5°C',
      },
    };

    const result = toFormattedWeatherData(data, 'celsius');
    expect(result).toEqual(expected);
  });

  test('given fahrenheit, returns an object with temperature values as strings with °F', () => {
    const data = {
      temperature_tempC: 68.8,
      feelsLike_tempC: 64.4,
      dailyRange: {
        min_tempC: 59.9,
        max_tempC: 77.7,
      },
    };

    const expected = {
      temperature: '68.8°F',
      feelsLike: '64.4°F',
      dailyRange: {
        min: '59.9°F',
        max: '77.7°F',
      },
    };

    const result = toFormattedWeatherData(data, 'fahrenheit');
    expect(result).toEqual(expected);
  });

  test('given roundValues, returns an object with rounded temperature values', () => {
    const dataCelsius = {
      temperature_tempC: 20.2,
      feelsLike_tempC: 18.8,
      dailyRange: {
        min_tempC: 15.5,
        max_tempC: 25.5,
      },
    };
    const dataFahrenheit = {
      temperature_tempC: 68.8,
      feelsLike_tempC: 64.4,
      dailyRange: {
        min_tempC: 59.9,
        max_tempC: 77.7,
      },
    };

    const expectedCelsius = {
      temperature: '20°C',
      feelsLike: '19°C',
      dailyRange: {
        min: '16°C',
        max: '26°C',
      },
    };
    const expectedFahrenheit = {
      temperature: '69°F',
      feelsLike: '64°F',
      dailyRange: {
        min: '60°F',
        max: '78°F',
      },
    };

    const resultCelsius = toFormattedWeatherData(dataCelsius, 'celsius', true);
    const resultFahrenheit = toFormattedWeatherData(dataFahrenheit, 'fahrenheit', true);
    expect(resultCelsius).toEqual(expectedCelsius);
    expect(resultFahrenheit).toEqual(expectedFahrenheit);
  });
});
