import type { Condition } from '$lib/types/weather';
import type { ConditionStatus, WeatherCondition } from '$lib/types/condition';
import { writable } from 'svelte/store';

function parseConditionStatus(condition: Condition['text']) {
    return weatherConditionStatuses[condition.toLocaleLowerCase()];
}

const weatherConditionStatuses: Record<WeatherCondition, ConditionStatus> = {
  'blowing snow': 'SNOWY',
  'freezing drizzle': 'FREEZING',
  'freezing fog': 'FREEZING',
  'heavy freezing drizzle': 'FREEZING',
  'heavy rain at times': 'RAINY',
  'heavy rain': 'RAINY',
  'heavy snow': 'SNOWY',
  'ice pellets': 'FREEZING',
  'light drizzle': 'RAINY',
  'light freezing rain': 'RAINY',
  'light rain shower': 'RAINY',
  'light rain': 'RAINY',
  'light showers of ice pellets': 'FREEZING',
  'light sleet showers': 'RAINY',
  'light sleet': 'RAINY',
  'light snow showers': 'SNOWY',
  'light snow': 'SNOWY',
  'moderate or heavy freezing rain': 'FREEZING',
  'moderate or heavy rain shower': 'RAINY',
  'moderate or heavy rain with thunder': 'THUNDER',
  'moderate or heavy showers of ice pellets': 'FREEZING',
  'moderate or heavy sleet showers': 'RAINY',
  'moderate or heavy sleet': 'RAINY',
  'moderate or heavy snow showers': 'SNOWY',
  'moderate or heavy snow with thunder': 'THUNDER',
  'moderate rain at times': 'RAINY',
  'moderate rain': 'RAINY',
  'moderate snow': 'SNOWY',
  'partly cloudy': 'SUNNY_CLOUDY',
  'patchy freezing drizzle possible': 'FREEZING',
  'patchy heavy snow': 'SNOWY',
  'patchy light drizzle': 'RAINY',
  'patchy light rain with thunder': 'THUNDER',
  'patchy light rain': 'RAINY',
  'patchy rain nearby': 'RAINY',
  'patchy light snow with thunder': 'THUNDER',
  'patchy light snow': 'SNOWY',
  'patchy moderate snow': 'SNOWY',
  'patchy rain possible': 'RAINY',
  'patchy sleet possible': 'RAINY',
  'patchy snow possible': 'SNOWY',
  'thundery outbreaks possible': 'THUNDER',
  'torrential rain shower': 'RAINY',
  blizzard: 'TORNADO',
  clear: 'SNOWY',
  cloudy: 'CLOUDY',
  fog: 'FOGGY',
  mist: 'FOGGY',
  overcast: 'CLOUDY',
  sunny: 'SUNNY',
};


function createConditionStatusStore() {
  const { update, subscribe } = writable<ConditionStatus | null>();

  function setCondition(condition: Condition['text']) {
    const status = parseConditionStatus(condition);

    update(() => status);
  }

  return { subscribe, setCondition };
}

const conditionStatusStore = createConditionStatusStore();

export default conditionStatusStore;
