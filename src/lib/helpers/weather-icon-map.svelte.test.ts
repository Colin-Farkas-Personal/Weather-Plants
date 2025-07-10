import { describe, expect, test } from "vitest";
import { getWeatherIcon } from "./weather-icon-map.svelte";

describe("getWeatherIcon", () => {
    test('Returns an icon for a known weather condition', () => {
        const condition = 'Sunny';
        const icon = getWeatherIcon(condition);
        
        expect(icon).toBeDefined();
        expect(icon!.name).toBe('SunBold');
    });

    test('Returns null for an unknown weather condition', () => {
        const condition = 'Unknown Condition';
        const icon = getWeatherIcon(condition);
        
        expect(icon).toBeNull();
    });
});