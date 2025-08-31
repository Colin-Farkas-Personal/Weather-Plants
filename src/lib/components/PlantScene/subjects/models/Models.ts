import * as THREE from "three";
import type { SceneSubject } from "../subject";
import { Plant } from "./Plant";
import { Pot } from "./Pot";

interface ConstructorParams {
    scene: THREE.Scene;
    light: THREE.DirectionalLight;
    potModelPath: string;
}

export class Models implements SceneSubject {

    private scene: THREE.Scene;
    private potModel: Pot;
    private plantModel: Plant | null = null;

    constructor ({ scene, light, potModelPath }: ConstructorParams) {
        this.scene = scene;
        this.potModel = new Pot({ scene, light, modelPath: potModelPath });
    }

    create(plantModelPath: string, modelType: 'pot' | 'plant'): void {
        switch (modelType) {
            case 'pot':
                this.potModel.create(plantModelPath);
                break;

            case 'plant':
                this.plantModel = new Plant({ scene: this.scene, modelPath: plantModelPath });
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