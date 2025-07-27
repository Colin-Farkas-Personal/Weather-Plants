import type { TemperatureRange } from "$lib/types/temperature";
import { temperatureToRange } from "$lib/utilities/temperature-to-range";
import { writable } from "svelte/store";

function createTemperatureThemeStore() {
    const { update, subscribe } = writable<TemperatureRange | null>();

    function setTheme(temp: number) {
        const themeRange = temperatureToRange(temp);

        update(() => themeRange);
    }

    return { subscribe, setTheme };
}

const temperatureThemeStore = createTemperatureThemeStore();

export default temperatureThemeStore;