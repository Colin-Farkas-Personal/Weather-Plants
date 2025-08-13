import * as THREE from 'three';
import { GLTFLoader, OrbitControls, RectAreaLightHelper } from 'three/examples/jsm/Addons.js';

const cameraOriginPosition = {
  x: 1.2,
  y: 1.2,
  z: 1.2,
};

function initScene(
  sceneContainer: HTMLElement,
  settings: { backgroundColor: number; groundColor: number }
) {
  // Scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(settings.backgroundColor);
  scene.fog = new THREE.Fog(settings.backgroundColor, 3, 4.5);

  // Camera
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(cameraOriginPosition.x, cameraOriginPosition.y, cameraOriginPosition.z);

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.75;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setPixelRatio(window.devicePixelRatio);
  sceneContainer.appendChild(renderer.domElement);

  // Light to simulate sunlight
  const hemi = new THREE.HemisphereLight(0xeeeeee);
  hemi.position.set(-3, 1.8, -3);
  hemi.intensity = 0.25;
  scene.add(hemi);

  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(1.6, 0.8, 0);
  dirLight.castShadow = true;
  dirLight.shadow.bias = -0.0001;
  dirLight.shadow.normalBias = 0.02;
  scene.add(dirLight);

  // Add pointer light behind plant to light up backside
  const pointLight = new THREE.PointLight(0xffffff, 0.5, 10);
  pointLight.position.set(0, 1, 1);
  scene.add(pointLight);

  // Rect light top left
  // const width1 = 1;
  // const height1 = 1;
  // const intensity1 = 0.5;
  // const rectLight = new THREE.RectAreaLight(0xfffbe5, intensity1, width1, height1); // Soft white with slight warmth
  // rectLight.position.set(0.45, 0.4, 1);
  // rectLight.rotation.x = -Math.PI / 2.2;
  // rectLight.lookAt(0, 0, 0);
  // scene.add(rectLight);

  // Rect light behind plant

  // Plane
  const plane = new THREE.Mesh(
    new THREE.CircleGeometry(5, 64),
    new THREE.MeshStandardMaterial({ color: settings.groundColor })
  );
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -0.28;
  plane.receiveShadow = true;
  scene.add(plane);

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enableZoom = false;

  controls.enablePan = false;
  controls.keyRotateSpeed = 15;
  controls.listenToKeyEvents(window);

  // Fix polar angle restrictions
  controls.minPolarAngle = Math.PI / 2.8;
  controls.maxPolarAngle = Math.PI / 2.8;

  // Adjust vertical framing
  controls.target.set(0, 0.15, 0);
  controls.update(); // Recalculate orbit based on new target
  // Rotate camera toward the new target
  camera.lookAt(controls.target);

  onResize(sceneContainer, renderer, camera);

  return { scene, camera, renderer, controls };
}

function loadModel(path: string, scene: THREE.Scene) {
  const loader = new GLTFLoader();

  loader.load(
    path,
    (gltf) => {
      gltf.scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.receiveShadow = true;
          child.castShadow = true;
        }
      });
      scene.add(gltf.scene);
    },
    undefined,
    (error) => {
      console.error('GLTF load error:', error);
    }
  );
}

function animate(
  scene: THREE.Scene,
  camera: THREE.Camera,
  renderer: THREE.WebGLRenderer,
  controls: OrbitControls
) {
  const animationFrameId = requestAnimationFrame(() =>
    animate(scene, camera, renderer, controls)
  );
  renderer.render(scene, camera);
  controls.update();

  return animationFrameId;
}

function onResize(
  container: HTMLElement,
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera
) {
  const width = container.clientWidth;
  const height = container.clientHeight;

  // #1 Update camera aspect
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  // #2 Adjust camera position if needed
  if (camera.aspect > 1) {
    camera.position.z = cameraOriginPosition.z / camera.aspect;
  } else {
    camera.position.z = cameraOriginPosition.z;
  }

  // #3 Update renderer size
  renderer.setSize(width, height);
  camera.updateProjectionMatrix();
}

export { animate, initScene, loadModel, onResize };
