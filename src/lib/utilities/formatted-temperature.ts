import type { TemperatureUnit, TemperatureUnitString } from "$lib/types/temperature";

type GenericObject = Record<string, unknown>;

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

      formattedData[newKeyName] = valuePart;
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

function toTemperatureUnit(temp: number, unit: TemperatureUnit) {
    const temperatureUnitString = getTemperatureUnitString(unit);

    return temp + temperatureUnitString;
}

export { toFormattedWeatherData, toTemperatureUnit };