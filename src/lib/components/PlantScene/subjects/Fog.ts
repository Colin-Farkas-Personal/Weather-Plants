import * as THREE from "three";
import type { SceneSubject } from "./subject";
import type { HexColor } from "../themes/theme";
import { toThreeColor } from "../SceneManager/to-three-color";

interface Constructor {
    scene: THREE.Scene;
    color: HexColor;
}

export class Fog implements SceneSubject {
    private fog: THREE.Fog;
    private startAt: number = 3;
    private endAt: number = 4.5;

    constructor({ scene, color }: Constructor) {
        const threeColor = toThreeColor(color);
        this.fog = new THREE.Fog(threeColor.color, this.startAt, this.endAt);
        scene.fog = this.fog;
    }

    update({ color }: { color: HexColor }): void {
        this.fog.color = toThreeColor(color).color;
    }
}