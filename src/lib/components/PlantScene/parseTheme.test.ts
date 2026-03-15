import { describe, expect, it } from 'vitest';
import { getSceneTheme } from './parseTheme';

describe('getSceneTheme precipitation mapping', () => {
	it('enables snow and disables rain for SNOWY', () => {
		const sceneTheme = getSceneTheme({
			range: 'Cold',
			condition: 'SNOWY',
			currentHour: 12,
			sunriseHour: 6,
			sunsetHour: 18,
		});

		expect(sceneTheme.snow?.enabled).toBe(true);
		expect(sceneTheme.rain).toBeUndefined();
	});

	it('enables rain and disables snow for RAINY', () => {
		const sceneTheme = getSceneTheme({
			range: 'Cold',
			condition: 'RAINY',
			currentHour: 12,
			sunriseHour: 6,
			sunsetHour: 18,
		});

		expect(sceneTheme.rain?.enabled).toBe(true);
		expect(sceneTheme.snow).toBeUndefined();
	});

	it('enables rain and disables snow for THUNDER', () => {
		const sceneTheme = getSceneTheme({
			range: 'Hot',
			condition: 'THUNDER',
			currentHour: 12,
			sunriseHour: 6,
			sunsetHour: 18,
		});

		expect(sceneTheme.rain?.enabled).toBe(true);
		expect(sceneTheme.snow).toBeUndefined();
	});
});
