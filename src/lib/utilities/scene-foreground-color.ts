import type { HSLColor } from '$lib/components/PlantScene/themes/theme.types';
import type { TemperatureRange } from '$lib/types/temperature';

interface CalculateSceneForegroundColorParams {
	backgroundColor: HSLColor;
	temperatureRange: TemperatureRange;
	priority: 'primary' | 'secondary' | 'tertiary';
}

function calculateSceneForegroundColor({
	backgroundColor,
	temperatureRange,
	priority,
}: CalculateSceneForegroundColorParams): HSLColor {
	// - Light and Dark color for each temperature range
	// - Light and Dark for each priority

	// # 1. Select color based on priority and temperature range color
	// # 2. Calculate contrast against background color for Dark and Light options
	// # 3. Return the color with the best contrast
	return backgroundColor;
}

const foregroundColorCold = {
	primary: 'hsl(210, 50%, 20%)' as HSLColor,
	secondary: 'hsl(210, 50%, 35%)' as HSLColor,
	tertiary: 'hsl(210, 50%, 50%)' as HSLColor,
};
