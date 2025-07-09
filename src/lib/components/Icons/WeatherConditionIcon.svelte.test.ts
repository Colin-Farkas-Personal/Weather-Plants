import { dayWeatherConditions, type WeatherCondition } from '$lib/types/weather-condition';
import { afterEach, describe, expect, test } from 'vitest';
import { cleanup, render } from '@testing-library/svelte';
import WeatherConditionIcon, {
  weatherConditionIcons,
} from '$lib/components/Icons/WeatherConditionIcon.svelte';
import { transformToTestId } from './SvgIcon.svelte';

afterEach(() => {
  cleanup();
});

describe('<WeatherConditionIcon />', () => {
  dayWeatherConditions.forEach((condition: WeatherCondition) => {
    const currentCondition = weatherConditionIcons[condition];
    const conditionHasIcon = currentCondition !== undefined;

    if (conditionHasIcon) {
      test(`Renders icon for condition: ${condition}`, () => {
        const renderView = render(WeatherConditionIcon, {
          props: {
            condition: condition,
          },
        });

        const iconTestId = 'svg-icon-' + transformToTestId(currentCondition.name);
        const iconElement = renderView.getByTestId(iconTestId);

        expect(iconElement).toBeTruthy();
      });
    } else {
      test(`Does not render an icon for condition: ${condition}`, () => {
        const renderView = render(WeatherConditionIcon, {
          props: { condition: condition },
        });

        const svgElement = renderView.container.querySelector('svg');
        expect(svgElement).toBeNull();
      });
    }
  });
});
