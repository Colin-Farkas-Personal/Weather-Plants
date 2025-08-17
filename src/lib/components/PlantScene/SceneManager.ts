import type { Scene } from "three";
import * as THREE from "three";
import { GeneralLights } from "./subjects/GeneralLights";
import { GroundPlane } from "./subjects/GroundPlane";
import type { SceneSubject } from "./subjects/Subject";
import { Fog } from "./subjects/Fog";
import { Sky } from "./subjects/Sky";
import { Model } from "./subjects/Model";
import { OrbitControls } from "three/examples/jsm/Addons.js";

interface ISceneManager {
    update: () => void;
    dispose: () => void;
    onWindowResize: () => void;
}

type ScreenDimensions = {
    width: number;
    height: number;
};

export class SceneManager implements ISceneManager {
    private clock: THREE.Clock;

    private _canvas: HTMLCanvasElement;
    private scene: Scene;
    private renderer: THREE.WebGLRenderer;
    private camera: THREE.PerspectiveCamera;
    private controls: OrbitControls;
    private sceneSubjects: SceneSubject[];

    private get screenDimensions(): ScreenDimensions {
        return {
            width: this._canvas.clientWidth,
            height: this._canvas.clientHeight
        };
    }

    constructor(canvas: HTMLCanvasElement) {
        this.clock = new THREE.Clock();
        this._canvas = canvas;

        this.scene = this.buildScene();

        const dimensions = this.screenDimensions;
        this.renderer = this.buildRenderer(dimensions);
        this.camera = this.buildCamera(dimensions);
        this.controls = this.buildOrbitControls();
        this.sceneSubjects = this.createSceneSubjects(this.scene);
    }
    
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
    const w = this._canvas.clientWidth;
    const h = Math.max(1, this._canvas.clientHeight);

    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(w, h, false);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    }

    private buildScene(): Scene {
        const scene = new THREE.Scene();
        return scene;
    }

    private buildRenderer({ width, height }: ScreenDimensions): THREE.WebGLRenderer {
        const antialias = (window.devicePixelRatio || 1) < 1.5;
        const renderer = new THREE.WebGLRenderer({
            canvas: this._canvas,
            antialias: antialias,
            alpha: false,
            powerPreference: "high-performance"
        });

        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;

        const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 2;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height, false);

        return renderer;
    }

    private buildCamera({ width, height }: ScreenDimensions): THREE.PerspectiveCamera {
        const fieldOfView = 50;
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

    private createSceneSubjects(scene: Scene): SceneSubject[] {
        const generalLights = new GeneralLights(scene);
        const groundPlane = new GroundPlane({ 
            scene: scene,
            color: new THREE.Color(0xF3FFA8),
        });
        const sky = new Sky({ 
            scene: scene, 
            color: new THREE.Color(0xD3D97A)
        });
        const fog = new Fog({ 
            scene: scene, 
            color: new THREE.Color(0xD3D97A), 
        });
        const model = new Model({
            scene: scene,
            path: '/models/sunflower_soft.glb'
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