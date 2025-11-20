import type { DefaultAttributes } from '../themes/theme.types';

interface LightSourceAttributes extends DefaultAttributes {
	intensity: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const lights = ['ambient', 'front'] as const;
type LightNames = (typeof lights)[number];

export type { LightNames, LightSourceAttributes };
