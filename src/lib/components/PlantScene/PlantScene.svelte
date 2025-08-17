<script lang="ts">
	import type { TemperatureRange } from '$lib/types/temperature';
	import { onDestroy, onMount } from 'svelte';
	import { SceneManager } from './SceneManager';

	// Props
	let temperatureRange = $state<TemperatureRange | null>('Hot');
	let raf = $state(0);
		
	// 3D
	let canvas: HTMLCanvasElement;
	let plantSceneManager: SceneManager;

	function render() {
		plantSceneManager.update();
		raf = requestAnimationFrame(render);
	}

	function onResizeHandler() {
		plantSceneManager?.onWindowResize();
	}

	onMount(() => {
		if (canvas) {
			plantSceneManager = new SceneManager(canvas);
			render();
		}
	});

	onDestroy(() => {
		if (raf) {
			cancelAnimationFrame(raf);
		}
		
		if (plantSceneManager) {
			plantSceneManager.dispose();
		}
	});
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
		outline: 4px solid blue;
		position: relative;
		width: 100%;
		height: 100%;
		max-height: 100%;
	}

	#plant-scene {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}
</style>
