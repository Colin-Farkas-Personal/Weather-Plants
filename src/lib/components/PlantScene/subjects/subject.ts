// subjects/Subject.ts
import type { HexColor, LightSourceAttributes } from "../themes/theme";
import type { LightNames } from "./general-lights";

type UpdateParams = {
  color?: HexColor;
  lights?: Record<LightNames, LightSourceAttributes>;
};

interface SceneSubject {
  update({ ...params }: UpdateParams): void;
}

export type { SceneSubject, UpdateParams };
