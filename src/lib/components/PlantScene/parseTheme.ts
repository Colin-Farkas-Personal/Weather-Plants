import type { ConditionStatus } from '$lib/types/condition';
import type { TemperatureRange } from '$lib/types/temperature';
import { calculateDayTimeBackgroundGradient } from './dayTimeModifier';
import { coldTheme } from './themes/cold';
import { defaultTheme } from './themes/default';
import { hotTheme } from './themes/hot';
import { pleasantTheme } from './themes/pleasant';
import type { SceneTheme, TemperatureThemeMap } from './themes/theme.types';

interface GetSceneThemeParams {
	range: TemperatureRange | null;
	condition: ConditionStatus | null;
	currentHour: number;
	sunriseHour: number;
	sunsetHour: number;
}
function getSceneTheme({
	range,
	condition,
	currentHour,
	sunriseHour,
	sunsetHour,
}: GetSceneThemeParams): SceneTheme {
	if (!range || !condition) {
		setScreenBackgroundColor(defaultTheme.background.color[0]);
		return defaultTheme;
	}

	// #1 Get the theme for the temperature range and condition
	const sceneTheme = temperatureSceneThemes[range][condition];
	if (!sceneTheme) {
		console.warn(
			`No scene theme implemented for range: "${range}" with condition: "${condition}"`,
		);
		return defaultTheme;
	}

	// #2 Calculate the current day time scene theme from hour of day
	const dayTimeSceneTheme = applyDayTimeModifier({
		sceneTheme,
		currentHour,
		sunriseHour,
		sunsetHour,
	});

	// #3 Set the main screen background (IOS) to match the scene background
	setScreenBackgroundColor(dayTimeSceneTheme.background.color[0]);

	return dayTimeSceneTheme;
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

interface ApplyDayTimeModifierParams {
	sceneTheme: SceneTheme;
	currentHour: number;
	sunriseHour: number;
	sunsetHour: number;
}
function applyDayTimeModifier({
	sceneTheme,
	currentHour,
	sunriseHour,
	sunsetHour,
}: ApplyDayTimeModifierParams): SceneTheme {
	const updatedBackgroundColor = calculateDayTimeBackgroundGradient({
		hourOfDay: currentHour,
		sunriseHour,
		sunsetHour,
		baseGradient: sceneTheme.background.color,
	});

	const modifiedSceneTheme = {
		...sceneTheme,
		background: { color: updatedBackgroundColor },
	} as SceneTheme;

	return modifiedSceneTheme;
}

function setScreenBackgroundColor(color: string): void {
	document.body.style.backgroundColor = color;

	let themeMeta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement;
	if (!themeMeta) {
		themeMeta = document.createElement('meta');
		themeMeta.name = 'theme-color';
		document.head.appendChild(themeMeta);
	}
	themeMeta.content = color;
}

export { getSceneTheme };
