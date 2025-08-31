import type { Scene } from "three";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { Fog } from "../subjects/Fog";
import { GeneralLights } from "../subjects/GeneralLights";
import { Ground } from "../subjects/Ground";
import { Models } from "../subjects/models/Models";
import { Sky } from "../subjects/Sky";
import type { SceneSubject } from "../subjects/subject";
import type { SceneTheme } from "../themes/theme.types";
import { getScreenOrientation } from "./aspect-ration";

interface ISceneManager {
    update: () => void;
    dispose: () => void;
    updateTheme: (theme: SceneTheme) => void;
    onWindowResize: () => void;
}

type CanvasDimensions = {
    width: number;
    height: number;
};

export class SceneManager implements ISceneManager {
    private _canvas: HTMLCanvasElement;
    private _theme: SceneTheme;
    private scene: Scene;
    private renderer: THREE.WebGLRenderer;
    private camera: THREE.PerspectiveCamera;
    private controls: OrbitControls;
    private sceneSubjects: SceneSubject[];
    private model: Models | null = null;

    private get canvasDimensions(): CanvasDimensions {
        return {
            width: this._canvas.clientWidth,
            height: this._canvas.clientHeight
        };
    }

    constructor(canvas: HTMLCanvasElement, theme: SceneTheme) {
        this._canvas = canvas;
        this._theme = theme;

        this.scene = this.buildScene();

        const canvasdimensions = this.canvasDimensions;
        this.renderer = this.buildRenderer(canvasdimensions);
        this.camera = this.buildCamera(canvasdimensions);
        this.controls = this.buildOrbitControls();
        this.sceneSubjects = this.createSceneSubjects(this.scene, this._theme);
    }

    // ---- PUBLIC METHODS ----

    update() {
        // for(const subject of this.sceneSubjects) {
        //     Subjects currently do not implement update logic
        //     subject.update();
        // }

        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    dispose() {
        this.controls.dispose();
        this.renderer.dispose();
    }

    onWindowResize() {
        const width = this.canvasDimensions.width;
        const height = Math.max(1, this.canvasDimensions.height);

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(width, height, false);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    }

    updateTheme(theme: SceneTheme) {
        const { model, fog, ground, lights } = theme;

        // Model
        if (model.plant) this.updateModel(model.plant.path, 'plant');
        if (model.pot) this.updateModel(model.pot.path, 'pot');

        // Meshes & Lights
        for(const subject of this.sceneSubjects) {
            if (subject instanceof GeneralLights) {
                subject.update({ lights: lights });
            }

            if (subject instanceof Fog) {
                subject.update({ color: fog.color });
            }

            if (subject instanceof Ground) {
                subject.update({ color: ground.color });
            }
        }
    }

    // ---- PRIVATE METHODS ----

    private buildScene(): Scene {
        const scene = new THREE.Scene();
        scene.environment = null;
        
        return scene;
    }

    private buildRenderer({ width, height }: CanvasDimensions): THREE.WebGLRenderer {
        const renderer = new THREE.WebGLRenderer({
            canvas: this._canvas,
            antialias: true,
            powerPreference: "high-performance",
        });
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(width, height, false);

        return renderer;
    }

    private buildCamera({ width, height }: CanvasDimensions): THREE.PerspectiveCamera {
        const { orientation } = getScreenOrientation();
        const fieldOfViewMobile = 42.5;
        const fieldOfViewDesktop = 55;
        const fieldOfView = orientation === 'portrait' ? fieldOfViewMobile : fieldOfViewDesktop;

        const aspectRatio = width / height;
        const nearPlane = 1;
        const farPlane = 1000;
        const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

        camera.position.set(1, 1, 1);

        return camera;
    }

    private buildOrbitControls(): OrbitControls {
        const controls = new OrbitControls(this.camera, this._canvas);

        controls.enableDamping = true;
        controls.dampingFactor = 0.05;

        controls.enableZoom = false;
        controls.enablePan = false;

        controls.keyRotateSpeed = 20;
        controls.listenToKeyEvents(window);

        controls.minPolarAngle = Math.PI / 2.8;
        controls.maxPolarAngle = Math.PI / 2.8;

        controls.target.set(0, 0.15, 0);

        return controls;
    }

    private createSceneSubjects(scene: Scene, theme: SceneTheme): SceneSubject[] {
        const { fog, ground, model } = theme;

        const generalLightsSubject = new GeneralLights(scene);
        const groundSubject = new Ground({ 
            scene: scene,
            color: ground.color,
        });
        const skySubject = new Sky({ 
            scene: scene
        });
        const fogSubject = new Fog({ 
            scene: scene, 
            color: fog.color
        });
        const modelSubject = new Models({
            scene: scene,
            light: generalLightsSubject.frontLight,
            potModelPath: model?.pot?.path as string,
        });
        this.model = modelSubject;

        const sceneSubjects: SceneSubject[] = [
            generalLightsSubject,
            groundSubject,
            skySubject,
            fogSubject,
            modelSubject
        ];

        return sceneSubjects;
    }

    private updateModel(plantModelPath: string, modelType: 'plant' | 'pot') {
        if (this.model) {
            this.model.dispose(modelType);
            this.model.create(plantModelPath, modelType);
        }
    }
}