<script lang="ts">
	import MainCondition from '$lib/components/MainCondition/MainCondition.svelte';
	import MainTemperature from '$lib/components/MainTemperature/MainTemperature.svelte';
	import { onMount } from 'svelte';

	// Props
	let { data } = $props();

	// 3D
	import * as THREE from 'three';
	import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

	onMount(() => {
		if (typeof window !== 'undefined') {
			const container = document.getElementById('three-container');
			if (!container) return;

			const colorBeige = new THREE.Color(0xf2d784);

			// Create scene, camera, and renderer first
			const scene = new THREE.Scene();
			scene.background = new THREE.Color(colorBeige);
			scene.fog = new THREE.Fog(colorBeige, 3, 4.5);

			const camera = new THREE.PerspectiveCamera(
				45,
				window.innerWidth / window.innerHeight,
				1,
				1000
			);
			camera.position.set(0, 1, 2);
			camera.lookAt(0, 0, 0);

			const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
			renderer.setSize(window.innerWidth, window.innerHeight);
			container.appendChild(renderer.domElement);
			renderer.shadowMap.enabled = true;
			renderer.shadowMap.type = THREE.PCFSoftShadowMap;

			// Heisphere
			const hemishphere = new THREE.HemisphereLight(0xeeeeee);
			hemishphere.intensity = 3.7;
			scene.add(hemishphere);

			// Area light
			const light = new THREE.DirectionalLight(0xffffff, 2);
			light.position.set(0.5, 0.6, 0.5);
			light.castShadow = true;
			scene.add(light);

			// Circle Plane (for shadows)
			const planeGeometry = new THREE.CircleGeometry(5, 64);
			const planeMaterial = new THREE.MeshStandardMaterial({ color: colorBeige });
			const plane = new THREE.Mesh(planeGeometry, planeMaterial);
			plane.rotation.x = -Math.PI / 2;
			plane.position.y = -0.28; // Slightly above ground to avoid z-fighting
			plane.receiveShadow = true; // Enable shadow receiving
			scene.add(plane);

			// Blender Model
			const loader = new GLTFLoader();
			loader.load(
				'/models/cactus_day.glb',
				(gltf) => {
					gltf.scene.position.set(0, 0, 0);
					scene.add(gltf.scene);
					gltf.scene.traverse((child) => {
						console.warn(child.name, child.material?.name);

						if (child.isMesh) {
							child.castShadow = true;
						}
					});
				},
				undefined,
				(error) => {
					console.error('GLTF load error:', error);
				}
			);

			// Resize handler
			function onResize() {
				const width = container.clientWidth;
				const height = container.clientHeight;
				renderer.setSize(width, height);
				camera.aspect = width / height;
				camera.updateProjectionMatrix();
			}
			window.addEventListener('resize', onResize);

			// --- Start render loop ---
			function animate() {
				requestAnimationFrame(animate);
				renderer.render(scene, camera);
			}
			onResize()
			animate();
		}
	});
</script>

<!-- Mount point for Three.js canvas -->
<div id="three-container"></div>

<!-- UI content -->
<h1>{data.location.name}</h1>
<p>{data.location.country}</p>

<MainTemperature temperature={data.temperature} feelsLike={data.feelsLike} />
<MainCondition
	condition={data.condition.text}
	min={data.dailyRange.min}
	max={data.dailyRange.max}
/>
