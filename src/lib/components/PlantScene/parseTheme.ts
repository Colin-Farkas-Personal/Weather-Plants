import { browser } from '$app/environment';
import type { ConditionStatus, CurrentCondition } from '$lib/globals/conditionStatusStore.svelte';
import type { TemperatureRange } from '$lib/types/temperature';
import { updateStarProperties } from './dayTimeModifiers/day-time-night-stars';
import {
	caclulateDayTimeLightPosition,
	calculateDayTimeBackgroundGradient,
	calculateDayTimeLightIntensity,
	calculateDayTimeShadowOpacity,
} from './dayTimeModifiers/dayTimeModifier';
import { coldTheme } from './themes/cold';
import { defaultTheme } from './themes/default';
import { hotTheme } from './themes/hot';
import { pleasantTheme } from './themes/pleasant';
import type { SceneTheme, TemperatureThemeMap } from './themes/theme.types';

interface GetSceneThemeParams {
	range: TemperatureRange;
	condition: CurrentCondition['status'];
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
	// #1 Get the theme for the temperature range and condition
	const sceneTheme = temperatureSceneThemes[range][condition];

	if (!sceneTheme) {
		console.warn(
			`No scene theme implemented for range: "${range}" with condition: "${condition}"`,
		);
		return defaultTheme;
	}

	// #2 Add cloud model for cloudy conditions
	sceneTheme.cloudModel = getCloudModelPath(condition);

	// #3 Calculate the current day time scene theme from hour of day
	const dayTimeSceneTheme = applyDayTimeModifier({
		sceneTheme,
		currentHour,
		sunriseHour,
		sunsetHour,
	});

	// #4 Set the main screen background (IOS) to match the scene background
	setScreenBackgroundColor(dayTimeSceneTheme.background.color[0]);

	// #5 IF Night time, add stars with smooth transition
	updateStarProperties({ hourOfDay: currentHour, sunriseHour, sunsetHour });

	// 5. IF FOGGY - Set fog color to match the top background color
	if (condition === 'FOGGY') {
		dayTimeSceneTheme.fog.color = dayTimeSceneTheme.background.color[0];
		dayTimeSceneTheme.lights.front.color = dayTimeSceneTheme.background.color[0];
		dayTimeSceneTheme.shadow.opacity = 0;
	}

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

const smallPairCloudPath = '/models/cloud/cloud-pair-small.glb';
const largeCloudPath = '/models/cloud/cloud-large.glb';
function getCloudModelPath(condition: ConditionStatus): string | undefined {
	switch (condition) {
		case 'CLOUDY':
		case 'FOGGY':
		case 'RAINY':
		case 'SNOWY':
		case 'WINDY':
		case 'THUNDER':
		case 'TORNADO':
			return largeCloudPath;
		case 'PARTLY_CLOUDY':
			return smallPairCloudPath;
		default:
			return undefined;
	}
}

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

	const updatedShadowOpacity = calculateDayTimeShadowOpacity({
		hourOfDay: currentHour,
		sunriseHour,
		sunsetHour,
	});

	const updatedLightPosition = caclulateDayTimeLightPosition({
		hourOfDay: currentHour,
		sunriseHour,
		sunsetHour,
	});

	const updatedLightIntensity = calculateDayTimeLightIntensity({
		hourOfDay: currentHour,
		sunriseHour,
		sunsetHour,
		minIntensity: 0,
		maxIntensity: 30,
	});

	const modifiedSceneTheme = {
		...sceneTheme,
		shadow: { opacity: updatedShadowOpacity },
		background: { color: updatedBackgroundColor },
		lights: {
			...sceneTheme.lights,
			front: {
				...sceneTheme.lights.front,
				position: updatedLightPosition,
				intensity: updatedLightIntensity,
			},
		},
	} as SceneTheme;

	return modifiedSceneTheme;
}

function setScreenBackgroundColor(color: string): void {
	if (!browser) return;

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
