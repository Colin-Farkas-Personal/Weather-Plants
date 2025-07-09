<script lang="ts">
	import MainCondition from '$lib/components/MainCondition/MainCondition.svelte';
	import MainTemperature from '$lib/components/MainTemperature/MainTemperature.svelte';
	import { onMount } from 'svelte';
	import { OrbitControls } from 'three/examples/jsm/Addons.js';

	// Props
	let { data } = $props();

	// 3D
	import * as THREE from 'three';
	import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

	onMount(() => {
		if (typeof window !== 'undefined') {
			const container = document.getElementById('three-container');
			if (!container) return;

			// Create scene, camera, and renderer first
			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera(
				75,
				window.innerWidth / window.innerHeight,
				0.1,
				1000
			);

			const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
			renderer.setSize(window.innerWidth, window.innerHeight);
			container.appendChild(renderer.domElement);
			renderer.outputColorSpace = THREE.SRGBColorSpace;
			renderer.shadowMap.enabled = true;
			renderer.shadowMap.type = THREE.PCFSoftShadowMap; // smooth edges
			renderer.outputColorSpace = THREE.SRGBColorSpace;

			const controls = new OrbitControls(camera, renderer.domElement);
			camera.position.set(0, 3.2, 0);
			controls.target.set(0, 0, 0);
			controls.update();

			// ✅ Heisphere
			const hemishphere = new THREE.HemisphereLight(0xeeeeee);
			hemishphere.intensity = 4;
			scene.add(hemishphere);

			// ✅ Now load the model and add to scene
			const loader = new GLTFLoader();
			loader.load(
				'/models/cactus_simple.glb',
				(gltf) => {
					scene.add(gltf.scene);
					gltf.scene.traverse((child) => {
						if (child.isMesh) {
							child.castShadow = true; // Enable shadow casting
						}
					});
				},
				undefined,
				(error) => {
					console.error('GLTF load error:', error);
				}
			);

			// ✅ Start render loop
			function animate() {
				requestAnimationFrame(animate);
				renderer.render(scene, camera);
			}
			animate();
		}
	});
</script>

<!-- Mount point for Three.js canvas -->
<!-- <div id="three-container" style="width: 100vw; height: 100vh;"></div> -->

<!-- UI content -->
<h1>{data.location.name}</h1>
<p>{data.location.country}</p>

<MainTemperature temperature={data.temperature} feelsLike={data.feelsLike} />
<MainCondition
	condition={data.condition.text}
	min={data.dailyRange.min}
	max={data.dailyRange.max}
/>
