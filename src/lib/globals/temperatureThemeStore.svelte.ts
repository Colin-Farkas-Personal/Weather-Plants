import type { TemperatureRange } from "$lib/types/temperature";
import { writable } from "svelte/store";

export const temperatureTheme = writable<TemperatureRange | null>();
