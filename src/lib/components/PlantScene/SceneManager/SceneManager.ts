import type { Scene } from "three";
import * as THREE from "three";
import { GeneralLights } from "../subjects/GeneralLights";
import { GroundPlane } from "../subjects/GroundPlane";
import type { SceneSubject } from "../subjects/subject";
import { Fog } from "../subjects/Fog";
import { Sky } from "../subjects/Sky";
import { Model } from "../subjects/Model";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import type { SceneTheme } from "../themes/theme";
import { getScreenOrientation } from "./aspect-ration";

interface ISceneManager {
    update: () => void;
    dispose: () => void;
    setTheme: (theme: SceneTheme) => void;
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

    setTheme(theme: SceneTheme) {
        this.createSceneSubjects(this.scene, theme);
        this.update();
    }

    // ---- PRIVATE METHODS ----

    private buildScene(): Scene {
        const scene = new THREE.Scene();
        return scene;
    }

    private buildRenderer({ width, height }: CanvasDimensions): THREE.WebGLRenderer {
        const antialias = (window.devicePixelRatio || 1) < 1.5;
        const renderer = new THREE.WebGLRenderer({
            canvas: this._canvas,
            antialias: antialias,
            alpha: false,
            powerPreference: "high-performance"
        });

        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;

        const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 2;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height, false);

        return renderer;
    }

    private buildCamera({ width, height }: CanvasDimensions): THREE.PerspectiveCamera {
        const { orientation } = getScreenOrientation();
        const fieldOfViewMobile = 42.5;
        const fieldOfViewDesktop = 50;
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
        const { modelPath, skyColor, fogColor, groundColor } = theme;

        const generalLights = new GeneralLights(scene);
        const groundPlane = new GroundPlane({ 
            scene: scene,
            color: new THREE.Color(groundColor),
        });
        const sky = new Sky({ 
            scene: scene, 
            color: new THREE.Color(skyColor)
        });
        const fog = new Fog({ 
            scene: scene, 
            color: new THREE.Color(fogColor), 
        });
        const model = new Model({
            scene: scene,
            path: modelPath
        })

        const sceneSubjects: SceneSubject[] = [
            generalLights,
            groundPlane,
            sky,
            fog,
            model
        ];

        return sceneSubjects;
    }
}