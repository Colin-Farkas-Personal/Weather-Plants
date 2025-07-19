const TEMPERATURE_HOT = 30;
const TEMPERATURE_PLEASANT = 20;
const TEMPERATURE_COLD = 10;

const temperatureModels: Map<number, string> = new Map([
    [TEMPERATURE_HOT, 'Cactus'],
    [TEMPERATURE_PLEASANT, 'Sunflower'],
    [TEMPERATURE_COLD, 'Fern']
]);

const defaultModel = 'Sunflower';
function getPlantByTemperatureCelsius(tempC: number): string {
  for (const [threshold, model] of temperatureModels) {
    if (tempC >= threshold) {
      return model;
    }
  }

  return defaultModel;
}

export { getPlantByTemperatureCelsius };
