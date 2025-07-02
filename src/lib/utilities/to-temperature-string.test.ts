import { describe, expect, test } from "vitest";
import toTemperatureString from "./to-temperature-string";

describe("toTemperatureString()", () => {
    test("given celcius, returns an object with temperature values as strings with °C", () => {
        const data = {
            temperature_c: 20,
            feelsLike_c: 18,
            dailyRange: {
                min_c: 15,
                max_c: 25
            }
        };

        const expected = {
            temperature: "20°C",
            feelsLike: "18°C",
            dailyRange: {
                min: "15°C",
                max: "25°C"
            }
        };

        const result = toTemperatureString(data, 'celsius');
        console.warn("Expected:", expected);
        console.warn("Result:", result);
        expect(result).toEqual(expected);
    });

    test("given fahrenheit, returns an object with temperature values as strings with °F", () => {
        const data = {
            temperature_f: 68,
            feelsLike_f: 64,
            dailyRange: {
            min_f: 59,
            max_f: 77
            }
        };

        const expected = {
            temperature: "68°F",
            feelsLike: "64°F",
            dailyRange: {
            min: "59°F",
            max: "77°F"
            }
        };

        const result = toTemperatureString(data, 'fahrenheit');
        console.warn("Expected:", expected);
        console.warn("Result:", result);
        expect(result).toEqual(expected);
    });
});