// subjects/Subject.ts
import type { HSLColor, LightSourceAttributes } from '../themes/theme.types';
import type { LightNames } from './general-lights.types';

type UpdateParams = {
	color?: HSLColor;
	lights?: Record<LightNames, LightSourceAttributes>;
	opacity?: number;
};

interface SceneSubject {
	update({ ...params }: UpdateParams): void;
}

export type { SceneSubject, UpdateParams };
