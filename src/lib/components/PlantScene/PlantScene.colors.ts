import type { ConditionStatus } from "$lib/types/condition";
import type { TemperatureRange } from "$lib/types/temperature";
type ConditionColor = {
    [key in ConditionStatus]: {
        background: number;
        ground: number;
    }
}

const themeColors: Record<TemperatureRange, ConditionColor> = {
  Cold: {
    SUNNY: {
        background: 0xb9b5c8,
        ground: 0xf7f5fb,
    },
    WINDY: {
        background: 0xA0A0A0,
        ground: 0xD3D3D3,
    },
    SUNNY_CLOUDY: {
        background: 0xB0C4DE,
        ground: 0xD3D3D3,
    },
    CLOUDY: {
        background: 0xB0C4DE,
        ground: 0xD3D3D3,
    },
    FOGGY: {
        background: 0xB0C4DE,
        ground: 0xD3D3D3,
    },
    RAINY: {
        background: 0xB0C4DE,
        ground: 0xD3D3D3,
    },
    THUNDER: {
        background: 0xB0C4DE,
        ground: 0xD3D3D3,
    },
    SNOWY: {
        background: 0xB0C4DE,
        ground: 0xD3D3D3,
    },
    FREEZING: {
        background: 0xB0C4DE,
        ground: 0xD3D3D3,
    },
  },
  Pleasant: {
    SUNNY: {
      background: 0x73D4EF,
      ground: 0xC8F3FF,
    },
  },
  Hot: {
    SUNNY: {
      background: 0xF0D783,
      ground: 0xF0D783,
  },
};

export { themeColors };