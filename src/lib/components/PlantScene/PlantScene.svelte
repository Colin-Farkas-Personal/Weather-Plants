<script lang="ts">
	import conditionStatusStore from '$lib/globals/conditionStatusStore.svelte';
	import temperatureRangeStore from '$lib/globals/temperatureRangeStore.svelte';
	import { getSceneTheme } from './parseTheme';
	import { SceneManager } from './SceneManager/SceneManager';
	import { defaultTheme } from './themes/default';

	// State
	let currentSceneTheme = $derived(() => getSceneTheme($temperatureRangeStore, $conditionStatusStore));

	// Variables
	let raf: number = 0;
	let canvas: HTMLCanvasElement;
	let plantSceneManager: SceneManager | null = null;
	
	// Initialize Scene Manager
	$effect(() => {
		if (!canvas) {
			return;
		}

		console.warn("Initializing Scene Manager");
		const defaultSceneTheme = defaultTheme;
		plantSceneManager = new SceneManager(canvas, defaultSceneTheme);
		render();

		// Cleanup
		return () => {
			if (raf) {
				cancelAnimationFrame(raf);
				raf = 0;
			}
			
			if (plantSceneManager) {
				plantSceneManager.dispose();
				plantSceneManager = null;
			}
		}
	});

	// Update Scene Theme
	$effect(() => {
		if (!canvas || !plantSceneManager) {
			return;
		}
		
		console.warn("Current theme");
		const theme = currentSceneTheme();
		plantSceneManager.updateTheme(theme);
	});

	// Functions
	function render() {
		raf = requestAnimationFrame(render);

		if (plantSceneManager) {
			plantSceneManager.update();
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
