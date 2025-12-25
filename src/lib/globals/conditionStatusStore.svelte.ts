import conditionObject from '$lib/conditions/condition.json';

export type CurrentCondition = {
	status: ConditionStatus;
	label: ConditionLabel;
	description: string;
};

export default function getCurrentCondition(
	conditionCode: number,
	timeOfDay: 'day' | 'night',
): CurrentCondition {
	const status = mapCodeToConditionStatus(timeOfDay)[conditionCode];

	return {
		status: status,
		label: statusToConditionLabel[status],
		description: getConditionDescription(conditionCode, timeOfDay),
	};
}

function mapCodeToConditionStatus(timeOfDay: 'day' | 'night'): Record<number, ConditionStatus> {
	return {
		1000: timeOfDay === 'day' ? 'SUNNY' : 'CLEAR',
		1003: 'PARTLY_CLOUDY',
		1006: 'CLOUDY',
		1009: 'CLOUDY',
		1030: 'CLOUDY',
		1063: 'RAINY',
		1066: 'SNOWY',
		1069: 'SNOWY',
		1072: 'FREEZING',
		1087: 'THUNDER',
		1114: 'SNOWY',
		1117: 'SNOWY',
		1135: 'CLOUDY',
		1147: 'CLOUDY',
		1150: 'RAINY',
		1153: 'RAINY',
		1168: 'FREEZING',
		1171: 'FREEZING',
		1180: 'RAINY',
		1183: 'RAINY',
		1186: 'RAINY',
		1189: 'RAINY',
		1192: 'RAINY',
		1195: 'RAINY',
		1198: 'FREEZING',
		1201: 'FREEZING',
		1204: 'SNOWY',
		1207: 'SNOWY',
		1210: 'SNOWY',
		1213: 'SNOWY',
		1216: 'SNOWY',
		1219: 'SNOWY',
		1222: 'SNOWY',
		1225: 'SNOWY',
		1237: 'FREEZING',
		1240: 'RAINY',
		1243: 'RAINY',
		1246: 'RAINY',
		1249: 'FREEZING',
		1252: 'FREEZING',
		1255: 'SNOWY',
		1258: 'SNOWY',
		1261: 'FREEZING',
		1264: 'FREEZING',
		1273: 'THUNDER',
		1276: 'THUNDER',
		1279: 'THUNDER',
		1282: 'THUNDER',
	};
}

export const statusToConditionLabel: Record<ConditionStatus, ConditionLabel> = {
	SUNNY: 'Sunny',
	CLEAR: 'Clear',
	WINDY: 'Windy',
	PARTLY_CLOUDY: 'Partly Cloudy',
	CLOUDY: 'Cloudy',
	FOGGY: 'Foggy',
	RAINY: 'Rainy',
	THUNDER: 'Thunder',
	SNOWY: 'Snowy',
	FREEZING: 'Freezing',
	TORNADO: 'Tornado',
};

function getConditionDescription(conditionCode: number, timeOfDay: 'day' | 'night'): string {
	const conditionCodeObject = conditionObject.find(
		(condition) => condition.code === conditionCode,
	);

	if (!conditionCodeObject) {
		console.warn(`No condition description found for code: ${conditionCode}`);
		return '';
	}

	const conditionDescription = conditionCodeObject[timeOfDay];

	return conditionDescription;
}

export type ConditionStatus =
	| 'SUNNY'
	| 'CLEAR'
	| 'WINDY'
	| 'PARTLY_CLOUDY'
	| 'CLOUDY'
	| 'FOGGY'
	| 'RAINY'
	| 'THUNDER'
	| 'SNOWY'
	| 'FREEZING'
	| 'TORNADO';

export type ConditionLabel =
	| 'Sunny'
	| 'Clear'
	| 'Windy'
	| 'Partly Cloudy'
	| 'Cloudy'
	| 'Foggy'
	| 'Rainy'
	| 'Thunder'
	| 'Snowy'
	| 'Freezing'
	| 'Tornado';
