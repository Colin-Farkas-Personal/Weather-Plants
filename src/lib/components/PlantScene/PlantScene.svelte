<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import * as THREE from 'three';
	import type { OrbitControls } from 'three/examples/jsm/Addons.js';
	import { animate, initScene, loadModel, onResize } from './PlantScene.renderer';
	import temperatureThemeStore from '$lib/globals/temperatureThemeStore.svelte';
	import { getSceneTheme } from './PlantScene.theme';
	import type { TemperatureRange } from '$lib/types/temperature';

	// Props
	let temperatureRange = $state<TemperatureRange | null>("Hot");

	// 3D
	let _container: HTMLElement;
	let _renderer: THREE.WebGLRenderer;
	let _camera: THREE.PerspectiveCamera;
	let _animationFramerId: number;
	let _controls: OrbitControls;

	
	onMount(() => {
		const unsubscribe = temperatureThemeStore.subscribe((t) => {
			if (t) {
				temperatureRange = t;
			}
		});

		if (typeof window !== 'undefined' && temperatureRange) {
			const container = document.getElementById('plant-scene');

			const { modelPath, backgroundColor, groundColor } = getSceneTheme(temperatureRange);
			const { scene, camera, renderer, controls } = initScene(container as HTMLElement, {
				backgroundColor,
				groundColor
			});
			loadModel(modelPath, scene);
			onResize(container as HTMLElement, renderer, camera);
			const animationFrameId = animate(scene, camera, renderer, controls);

			_renderer = renderer;
			_camera = camera;
			_container = container as HTMLElement;
			_animationFramerId = animationFrameId;
			_controls = controls;
		}
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			cancelAnimationFrame(_animationFramerId);
			_renderer?.dispose();
		}
	});
</script>

<svelte:window on:resize={() => onResize(_container, _renderer, _camera)} />

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div class="size-container">
	<figure
		id="plant-scene"
		class="plant-scene"
		tabindex="0"
		aria-label="3D plant representing current weather in Athens"
	></figure>
</div>

<style lang="scss">
	.size-container {
		position: relative;
		flex: 1;
	}

	:global {
		.plant-scene {
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			overflow: hidden;

			canvas {
				position: relative;
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
