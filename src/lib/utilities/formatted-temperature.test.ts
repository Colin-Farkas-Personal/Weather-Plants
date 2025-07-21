import { describe, expect, test } from 'vitest';
import { toFormattedWeatherData, toTemperatureUnit } from './formatted-temperature';

describe('toFormattedWeatherData()', () => {
  test('Returns an object where "tempC" is removed from object keys', () => {
    const data = {
      temperature_tempC: 20.2,
    };

    const expected = {
      temperature: 20.2,
    };

    const result = toFormattedWeatherData(data);
    expect(Object.keys(result)).toContain('temperature');
    expect(result).toEqual(expected);
  });
  
  test('Given celcius, returns an object with temperature values unchanged', () => {
    const data = {
      temperature_tempC: 20.2,
      feelsLike_tempC: 18.8,
      dailyRange: {
        min_tempC: 15.5,
        max_tempC: 25.5,
      },
    };

    const expected = {
      temperature: 20.2,
      feelsLike: 18.8,
      dailyRange: {
        min: 15.5,
        max: 25.5,
      },
    };

    const result = toFormattedWeatherData(data, 'celsius');
    expect(result).toEqual(expected);
  });

  test('Given fahrenheit, returns an object with temperature values in fahrenheit', () => {
    const data = {
      temperature_tempC: 68.8,
      feelsLike_tempC: 64.4,
      dailyRange: {
        min_tempC: 59.9,
        max_tempC: 77.7,
      },
    };

    const expected = {
      temperature: 68.8,
      feelsLike: 64.4,
      dailyRange: {
        min: 59.9,
        max: 77.7,
      },
    };

    const result = toFormattedWeatherData(data, 'fahrenheit');
    expect(result).toEqual(expected);
  });

  test('Given roundValues is true, returns an object with rounded temperature values', () => {
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
      temperature: 20,
      feelsLike: 19,
      dailyRange: {
      min: 16,
      max: 26,
      },
    };
    const expectedFahrenheit = {
      temperature: 69,
      feelsLike: 64,
      dailyRange: {
      min: 60,
      max: 78,
      },
    };

    const resultCelsius = toFormattedWeatherData(dataCelsius, 'celsius', true);
    const resultFahrenheit = toFormattedWeatherData(dataFahrenheit, 'fahrenheit', true);
    expect(resultCelsius).toEqual(expectedCelsius);
    expect(resultFahrenheit).toEqual(expectedFahrenheit);
  });
});

describe('toTemperatureUnit()', () => {
  test('Given celsius, returns temperature string with celsius symbol', () => {
    const result = toTemperatureUnit(20, 'celsius');
    expect(result).toBe('20°C');
  })

  test('Given fahrenheit, returns temperature string with celsius symbol', () => {
    const result = toTemperatureUnit(20, 'fahrenheit');
    expect(result).toBe('20°F');
  })
});