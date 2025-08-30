import type { HexColor } from "../themes/theme.types";

type LightSourceAttributes = {
  color: HexColor;
  intensity: number;
};


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const lights = ['ambient', 'front', 'back'] as const;
type LightNames = typeof lights[number];

export type { LightNames, LightSourceAttributes };