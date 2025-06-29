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
});