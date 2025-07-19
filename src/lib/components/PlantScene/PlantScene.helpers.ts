import * as THREE from 'three';
import { GLTFLoader, OrbitControls } from 'three/examples/jsm/Addons.js';

function initScene(sceneContainer: HTMLElement) {
  const colorBeige = new THREE.Color(0xf2d784);

  // Scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(colorBeige);
  scene.fog = new THREE.Fog(colorBeige, 3, 4.5);

  // Camera
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(1.2, 1, 1.2);
  camera.lookAt(0, 0, 0);

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
    new THREE.MeshStandardMaterial({ color: colorBeige })
  );
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -0.28;
  plane.receiveShadow = true;
  scene.add(plane);

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enableZoom = false;
  controls.maxPolarAngle = 0;
  controls.minPolarAngle = 1;

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
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

export { initScene, loadModel, animate, onResize };
