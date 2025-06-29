type TemperatureUnit = "celsius" | "fahrenheit";
export default function toTemperatureString(dataObject: Record<string, unknown>, unit: TemperatureUnit): Record<string, unknown> {
    const temperatureDataUnitKey = unit === "celsius" ? "_c" : "_f";
    const temperatureUnitCharacter = unit === "celsius" ? "°C" : "°F";

    const dataObjectTransformed: Record<string, unknown> = { ...dataObject };

    for (const [key, value] of Object.entries(dataObject)) {
        if (typeof value === 'object' && value !== null) {
            const newValueObject = toTemperatureString(value as Record<string, unknown>, unit);

            dataObjectTransformed[key] = newValueObject;
            
        }
        
        if (key.includes(temperatureDataUnitKey)) {
            const newKey = key.replace(temperatureDataUnitKey, '');
            const temperatureValueRounded = Math.round(value as number);
            dataObjectTransformed[newKey] = `${temperatureValueRounded}${temperatureUnitCharacter}`;

            delete dataObjectTransformed[key];
        }
    }

    return dataObjectTransformed;
}