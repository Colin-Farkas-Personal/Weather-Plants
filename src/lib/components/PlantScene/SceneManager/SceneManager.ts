import type { Scene } from 'three';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { Fog } from '../subjects/Fog';
import { GeneralLights } from '../subjects/GeneralLights';
import { Ground } from '../subjects/Ground';
import { Model } from '../subjects/Model';
import { RainParticleSystem } from '../subjects/RainParticleSystem';
import { SnowParticleSystem } from '../subjects/SnowParticleSystem';
import type { SceneSubject } from '../subjects/subject.types';
import type { RainOptions, SceneTheme, SnowOptions } from '../themes/theme.types';
import { getScreenOrientation } from './aspect-ration';

interface ISceneManager {
	update: () => void;
	dispose: () => void;
	updateTheme: (theme: SceneTheme) => void;
	setRainOptions: (options: RainOptions) => void;
	setSnowOptions: (options: SnowOptions) => void;
	onWindowResize: () => void;
}

type CanvasDimensions = {
	width: number;
	height: number;
};

type Models = {
	pot: Model | undefined;
	plant: Model | undefined;
	cloud: Model | undefined;
};

export class SceneManager implements ISceneManager {
	private _canvas: HTMLCanvasElement;
	private _theme: SceneTheme;
	private scene: Scene;
	private renderer: THREE.WebGLRenderer;
	private camera: THREE.PerspectiveCamera;
	private controls: OrbitControls;
	private sceneSubjects: SceneSubject[];
	private models: Models = { pot: undefined, plant: undefined, cloud: undefined };
	private _desiredCloudModel: string | undefined = undefined;
	private _fadingOutCloud: Model | undefined = undefined;
	private rain: RainParticleSystem;
	private snow: SnowParticleSystem;
	private _clock = new THREE.Clock();
	private _cloudBounds = new THREE.Box3();
	private _plantBounds = new THREE.Box3();

	private get canvasDimensions(): CanvasDimensions {
		return {
			width: this._canvas.clientWidth,
			height: this._canvas.clientHeight,
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
		this.rain = new RainParticleSystem({
			scene: this.scene,
			getCloudBounds: () => this.models.cloud?.getWorldBounds(this._cloudBounds),
			getPlantBounds: () => this.models.plant?.getWorldBounds(this._plantBounds),
			options: this._theme.rain,
		});
		this.snow = new SnowParticleSystem({
			scene: this.scene,
			getCloudBounds: () => this.models.cloud?.getWorldBounds(this._cloudBounds),
			getPlantBounds: () => this.models.plant?.getWorldBounds(this._plantBounds),
			options: this._theme.snow,
		});
		this.onWindowResize();
	}

	// ---- PUBLIC METHODS ----

	update() {
		const delta = this._clock.getDelta();

		this.models.pot?.update();
		this.models.plant?.update();
		this.models.cloud?.update();
		this._fadingOutCloud?.update();
		this.rain.update(delta);
		this.snow.update(delta);

		this.controls.update();
		this.renderer.render(this.scene, this.camera);
	}

	dispose() {
		this.controls.dispose();
		this.rain.dispose();
		this.snow.dispose();
		this.renderer.dispose();
		this.renderer.forceContextLoss();
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
		const { model, cloudModel, fog, lights, shadow, rain, snow } = theme;

		// Model
		const isDifferentPlantModel = model.plant?.path !== this.models.plant?._modelPath;
		if (model.plant && isDifferentPlantModel) {
			this.updateModel(model.plant.path, 'plant');
		}

		const isDifferentPotModel = model.pot?.path !== this.models.pot?._modelPath;
		if (model.pot && isDifferentPotModel) {
			this.updateModel(model.pot.path, 'pot');
		}

		// Cloud Model
		this._desiredCloudModel = cloudModel;
		this.applyDesiredCloudState();

		if (snow?.enabled) {
			this.snow.setOptions(snow);
			this.snow.start();
			this.rain.stop();
		} else if (rain?.enabled) {
			this.rain.setOptions(rain);
			this.rain.start();
			this.snow.stop();
		} else {
			this.rain.stop();
			this.snow.stop();
		}

		// Meshes & Lights
		for (const subject of this.sceneSubjects) {
			if (subject instanceof GeneralLights) {
				subject.update({ lights });
			}

			if (subject instanceof Fog) {
				subject.update({ color: fog.color, density: fog.density });
			}

			if (subject instanceof Ground) {
				subject.update({ opacity: shadow?.opacity });
			}
		}
	}

	setRainOptions(options: RainOptions) {
		this.rain.setOptions(options);
	}

	setSnowOptions(options: SnowOptions) {
		this.snow.setOptions(options);
	}

	// ---- PRIVATE METHODS ----

	private buildScene(): Scene {
		const scene = new THREE.Scene();
		scene.environment = null;
		scene.background = null;

		return scene;
	}

	private buildRenderer({ width, height }: CanvasDimensions): THREE.WebGLRenderer {
		const renderer = new THREE.WebGLRenderer({
			canvas: this._canvas,
			antialias: true,
			powerPreference: 'high-performance',
			alpha: true,
		});

		renderer.outputColorSpace = THREE.SRGBColorSpace;
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
		renderer.toneMappingExposure = 1.5;
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;

		renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
		renderer.setSize(width, height, false);

		return renderer;
	}

	private buildCamera({ width, height }: CanvasDimensions): THREE.PerspectiveCamera {
		const { orientation } = getScreenOrientation();
		const fieldOfViewMobile = 43;
		const fieldOfViewDesktop = 55;
		const fieldOfView = orientation === 'portrait' ? fieldOfViewMobile : fieldOfViewDesktop;

		const aspectRatio = width / height;
		const nearPlane = 1;
		const farPlane = 1000;
		const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

		const x = 1;
		const y = 2;
		const z = 0;
		camera.position.set(x, y, z);

		return camera;
	}

	private buildOrbitControls(): OrbitControls {
		const controls = new OrbitControls(this.camera, this._canvas);

		controls.enableDamping = true;
		controls.dampingFactor = 0.05;

		controls.enableZoom = false;
		controls.enablePan = false;

		controls.minPolarAngle = Math.PI / 2.35;
		controls.maxPolarAngle = Math.PI / 2.35;

		controls.target.set(0, 0.325, 0);

		controls.enableRotate = false;

		return controls;
	}

	private createSceneSubjects(scene: Scene, theme: SceneTheme): SceneSubject[] {
		const { model } = theme;

		const generalLightsSubject = new GeneralLights(scene);
		const groundSubject = new Ground({
			scene: scene,
		});
		const fogSubject = new Fog({
			scene: scene,
		});
		const potSubject = new Model({
			scene: scene,
			modelPath: model?.pot?.path as string,
		});

		const sceneSubjects: SceneSubject[] = [
			generalLightsSubject,
			groundSubject,
			fogSubject,
			potSubject,
		];

		return sceneSubjects;
	}

	private updateModel(modelPath: string, modelType: 'plant' | 'pot' | 'cloud') {
		const existing = this.models[modelType];
		if (existing) {
			existing.dispose();
			existing.create(modelPath);
			return;
		}

		this.models[modelType] = new Model({ scene: this.scene, modelPath });
	}

	private applyDesiredCloudState() {
		const desired = this._desiredCloudModel;
		const current = this.models.cloud;

		if (desired && desired !== current?._modelPath) {
			// Swap to a different cloud model
			if (current) {
				this.retireCloud(current);
				this.models.cloud = undefined;
			}
			this.updateModel(desired, 'cloud');
			this.models.cloud!.fadeIn();
		} else if (!desired && current) {
			// No cloud desired — fade out then remove
			this.retireCloud(current);
			this.models.cloud = undefined;
		}
	}

	private retireCloud(cloud: Model) {
		// If there's already a cloud fading out, dispose it immediately
		if (this._fadingOutCloud) {
			this._fadingOutCloud.dispose();
		}
		this._fadingOutCloud = cloud;
		cloud.fadeOut(() => {
			cloud.dispose();
			if (this._fadingOutCloud === cloud) {
				this._fadingOutCloud = undefined;
			}
		});
	}
}
