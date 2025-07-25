import { TEMPERATURE_COLD, TEMPERATURE_HOT } from "$lib/components/PlantScene/PlantScene.theme";
import type { TemperatureRange } from "$lib/types/temperature";

function temperatureToRange(tempC: number): TemperatureRange {
  if (tempC <= TEMPERATURE_COLD) {
    return 'Cold';
  } else if (tempC < TEMPERATURE_HOT) {
    return 'Pleasant'; 
  } else {
    return 'Hot';
  }
}

export { temperatureToRange };