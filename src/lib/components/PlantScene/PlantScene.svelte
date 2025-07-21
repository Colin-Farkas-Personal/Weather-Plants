<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import * as THREE from 'three';
	import { animate, initScene, loadModel, onResize } from './PlantScene.renderer';
	import { getSceneThemeByTemperature } from '$lib/components/PlantScene/PlantScene.theme';

	// Props
	let { temperature } = $props();

	// 3D
	let _container: HTMLElement;
	let _renderer: THREE.WebGLRenderer;
	let _camera: THREE.PerspectiveCamera;
	let _animationFramerId: number;

	onMount(() => {
		if (typeof window !== 'undefined') {
			const container = document.getElementById('three-container');

			const { modelPath, backgroundColor, groundColor } = getSceneThemeByTemperature(temperature);
			const { scene, camera, renderer, controls } = initScene(container as HTMLElement, {
				backgroundColor,
				groundColor
			});
			loadModel(modelPath, scene);
			const animationFrameId = animate(scene, camera, renderer, controls);

			window.addEventListener('resize', () => onResize(container as HTMLElement, renderer, camera));
			onResize(container as HTMLElement, renderer, camera);

			_renderer = renderer;
			_camera = camera;
			_container = container as HTMLElement;
			_animationFramerId = animationFrameId;
		}
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			cancelAnimationFrame(_animationFramerId);
			window.removeEventListener('resize', () => onResize(_container, _renderer, _camera));
			_renderer?.dispose();
		}
	});
</script>

<div id="three-container"></div>

<style lang="scss">
	:global(#three-container > canvas) {
		touch-action: pan-y !important;
	};
</style>
