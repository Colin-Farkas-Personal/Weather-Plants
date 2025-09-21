import type { ConditionStatus } from '$lib/types/condition';
import type { TemperatureRange } from '$lib/types/temperature';
import { pleasantTheme } from './themes/pleasant';
import { defaultTheme } from './themes/default';
import { hotTheme } from './themes/hot';
import type { SceneTheme, TemperatureThemeMap } from './themes/theme.types';
import { getScreenOrientation } from './SceneManager/aspect-ration';
import { coldTheme } from './themes/cold';

function setOverviewLocationBackgroundColor(color: string): void {
	const bodyElement = document.body as HTMLElement;
	const locationElement = document.getElementById('secondary-section-inner');

	const { orientation } = getScreenOrientation();

	if (orientation === 'portrait') {
		if (bodyElement) {
			bodyElement.style.backgroundColor = color;
		}

		if (locationElement) {
			locationElement.style.backgroundColor = color;
		}
	}
}

const temperatureSceneThemes: TemperatureThemeMap = {
	Cold: {
		...coldTheme,
	},
	Pleasant: {
		...pleasantTheme,
	},
	Hot: {
		...hotTheme,
	},
};

function getSceneTheme(
	range: TemperatureRange | null,
	condition: ConditionStatus | null,
): SceneTheme {
	if (!range || !condition) {
		return defaultTheme;
	}

	const sceneTheme = temperatureSceneThemes[range][condition];
	if (!sceneTheme) {
		console.warn(
			`No scene theme implemented for range: "${range}" with condition: "${condition}"`,
		);
		return defaultTheme;
	}

	// Set background color for location on mobile
	setOverviewLocationBackgroundColor(sceneTheme.fog.color);

	return sceneTheme;
}

export { getSceneTheme };

// COLD
// modelPath: modelPathSappling,
// backgroundColor: 0xb9b5c8,
// groundColor: 0xf7f5fb,
