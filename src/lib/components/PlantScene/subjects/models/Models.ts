import * as THREE from "three";
import type { SceneSubject } from "../subject";
import { Plant } from "./Plant";
import { Pot } from "./Pot";

interface ConstructorParams {
    scene: THREE.Scene;
    light: THREE.SpotLight;
    potModelPath: string;
}

export class Models implements SceneSubject {

    private scene: THREE.Scene;
    private _light: THREE.SpotLight;
    private potModel: Pot;
    private plantModel: Plant | null = null;

    constructor ({ scene, light, potModelPath }: ConstructorParams) {
        this.scene = scene;
        this._light = light
        this.potModel = new Pot({ scene, modelPath: potModelPath });
    }

    create(modelPath: string, modelType: 'pot' | 'plant'): void {
        switch (modelType) {
            case 'pot':
                this.potModel.create(modelPath);
                break;

            case 'plant':
                this.plantModel = new Plant({ scene: this.scene, light: this._light, modelPath: modelPath });
                break;

            default:
                break;
        }
    }
    
    update(): void {
        console.warn("Method not implemented.", this);
    }

    dispose(modelType: 'pot' | 'plant'): void {
        switch (modelType) {
            case 'pot':
                this.potModel.dispose();
                break;

            case 'plant':
                this.plantModel?.dispose();
                break;

            default:
                break;
        }
    }
}