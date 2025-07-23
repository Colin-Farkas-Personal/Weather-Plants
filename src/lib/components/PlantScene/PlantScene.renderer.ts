import * as THREE from 'three';
import { GLTFLoader, OrbitControls } from 'three/examples/jsm/Addons.js';

const cameraOriginPosition = {
  x: 1,
  y: 1,
  z: 1,
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
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  sceneContainer.appendChild(renderer.domElement);

  // Lights
  const hemi = new THREE.HemisphereLight(0xeeeeee);
  hemi.intensity = 3.7;
  scene.add(hemi);

  const dirLight = new THREE.DirectionalLight(0xffffff, 3.5);
  dirLight.position.set(1.6, 0.8, 0);
  dirLight.castShadow = true;
  scene.add(dirLight);

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
  controls.minPolarAngle = Math.PI / 2.4;
  controls.maxPolarAngle = Math.PI / 2.4;

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
      gltf.scene.position.set(0, 0, 0);
      gltf.scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
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
