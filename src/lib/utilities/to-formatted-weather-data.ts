import type { TemperatureUnit } from "$lib/types/temperature";

type GenericObject = Record<string, unknown>;
type TemperatureUnitString = '°C' | '°F' | '°';

const TEMPERATURE_DATA_UNIT_KEY = '_tempC';

function toFormattedWeatherData<T extends GenericObject>(
  dataObject: GenericObject,
  unit: TemperatureUnit = 'celsius',
  roundValues: boolean = false
): T {
  const formattedData: GenericObject = {};

  for (const [key, value] of Object.entries(dataObject)) {
    if (value && typeof value === 'object') {
      const newValueObject = toFormattedWeatherData(value as GenericObject, unit, roundValues);
      formattedData[key] = newValueObject;
      continue;
    }

    if (key.includes(TEMPERATURE_DATA_UNIT_KEY) && typeof value === 'number') {
      const newKeyName = key.replace(TEMPERATURE_DATA_UNIT_KEY, '');
      const valuePart = roundValues ? Math.round(value) : value;
      const unitString = unit ? getTemperatureUnitString(unit) : '°';

      formattedData[newKeyName] = `${valuePart}${unitString}`;
      continue;
    }

    formattedData[key] = value; 
  }

  return formattedData as T;
}

function getTemperatureUnitString(unit: TemperatureUnit): TemperatureUnitString {
  if (unit === 'fahrenheit') {
    return '°F';
  }

  return '°C';
}

export { toFormattedWeatherData };