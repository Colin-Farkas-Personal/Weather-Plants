<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { SceneManager } from './SceneManager/SceneManager';
	import { defaultTheme } from './themes/default';
	import type { SceneTheme } from './themes/theme.types';
	import { calculateDayTimeBackgroundGradient } from './dayTimeModifier';

	// Props
	interface PlantSceneProps {
		sceneTheme: SceneTheme;
		currentHour?: number;
	}

	let { sceneTheme, currentHour = 12 }: PlantSceneProps = $props();

	// Variables
	let sceneBackgroundGradientColors = $derived.by(() => {
		const params = {
			hourOfDay: currentHour,
			sunriseHour: 6,
			sunsetHour: 18,
			baseGradient: sceneTheme.background.color,
		};

		return calculateDayTimeBackgroundGradient(params);
	});

	let canvas: HTMLCanvasElement;
	let plantSceneManager: SceneManager | null;
	let rafID: number | null;

	// Initialize Scene Manager
	onMount(() => {
		// Create Scene Manager
		plantSceneManager = new SceneManager(canvas, defaultTheme);
		render();

		// Cleanup
		return () => {
			stopRender();
			removeSceneManager();
		};
	});

	// Update Scene Theme
	$effect(() => {
		if (plantSceneManager) {
			// const theme = currentSceneTheme();
			const theme = sceneTheme;
			plantSceneManager.updateTheme(theme);
		}
	});

	onDestroy(() => {
		stopRender();
		removeSceneManager();
	});

	// Functions
	function render() {
		rafID = requestAnimationFrame(render);

		if (plantSceneManager) {
			plantSceneManager.update();
		}
	}

	function stopRender() {
		if (rafID) {
			cancelAnimationFrame(rafID);
			rafID = null;
		}
	}

	function removeSceneManager() {
		if (plantSceneManager) {
			plantSceneManager.dispose();
			plantSceneManager = null;
		}
	}

	function onResizeHandler() {
		if (plantSceneManager) {
			plantSceneManager.onWindowResize();
		}
	}
</script>

<svelte:window on:resize={onResizeHandler} />

<figure
	class="size-container"
	style="background: linear-gradient(to bottom, {sceneBackgroundGradientColors[0]}, {sceneBackgroundGradientColors[1]})"
>
	<canvas id="plant-scene" class="plant-scene" tabindex="-1" bind:this={canvas}></canvas>
</figure>

<style lang="scss">
	.size-container {
		position: relative;
		width: 100%;
		height: 100%;
	}

	#plant-scene {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}
</style>
