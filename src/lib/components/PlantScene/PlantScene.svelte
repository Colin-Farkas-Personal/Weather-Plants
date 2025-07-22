<script lang="ts">
	import { getSceneThemeByTemperature } from '$lib/components/PlantScene/PlantScene.theme';
	import { onDestroy, onMount } from 'svelte';
	import * as THREE from 'three';
	import type { OrbitControls } from 'three/examples/jsm/Addons.js';
	import { animate, initScene, loadModel, onResize } from './PlantScene.renderer';

	// Props
	interface PlantSceneProps {
		temperature: number;
		variant: 'mobile' | 'desktop';
	}
	let { temperature, variant }: PlantSceneProps = $props();

	// 3D
	let _container: HTMLElement;
	let _renderer: THREE.WebGLRenderer;
	let _camera: THREE.PerspectiveCamera;
	let _animationFramerId: number;
	let _controls: OrbitControls;

	onMount(() => {
		if (typeof window !== 'undefined') {
			const container = document.getElementById('plant-scene');

			const { modelPath, backgroundColor, groundColor } = getSceneThemeByTemperature(temperature);
			const { scene, camera, renderer, controls } = initScene(container as HTMLElement, {
				backgroundColor,
				groundColor
			});
			loadModel(modelPath, scene);
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
<figure
	id="plant-scene"
	class={`plant-scene-${variant}`}
	tabindex="0"
	aria-label="3D plant representing current weather in Athens"
></figure>

<style lang="scss">
	:global {
		.plant-scene-mobile {
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;

			canvas {
				touch-action: pan-y !important;
				width: 100%;
				height: 100%;
			}
		}

		.plant-scene-desktop {
			width: 100%;
			height: 100%;

			canvas {
				touch-action: pan-y !important;
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
