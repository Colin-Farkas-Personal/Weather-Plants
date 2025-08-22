<script lang="ts">
	import conditionStatusStore from '$lib/globals/conditionStatusStore.svelte';
	import temperatureRangeStore from '$lib/globals/temperatureRangeStore.svelte';
	import { onMount } from 'svelte';
	import { getSceneTheme } from './parseTheme';
	import { SceneManager } from './SceneManager/SceneManager';
	import { defaultTheme } from './themes/default';

	// State
	let currentSceneTheme = $derived(() => getSceneTheme($temperatureRangeStore, $conditionStatusStore));
	
	// Variables
	let canvas: HTMLCanvasElement;
	let plantSceneManager: SceneManager | null;
	let rafID: number | null;
	
	// Initialize Scene Manager
	onMount(() => {
		plantSceneManager = new SceneManager(canvas, defaultTheme);
		render();

		// Cleanup
		return () => {
			stopRender();
			removeSceneManager();
		}
	});

	// Update Scene Theme
	$effect(() => {
		if (plantSceneManager) {
			const theme = currentSceneTheme();
			plantSceneManager.updateTheme(theme);
		}
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

<figure class="size-container">
	<canvas
		id="plant-scene"
		class="plant-scene"
		tabindex="0"
		aria-label="3D plant representing current weather in Athens"
		bind:this={canvas}
	></canvas>
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
