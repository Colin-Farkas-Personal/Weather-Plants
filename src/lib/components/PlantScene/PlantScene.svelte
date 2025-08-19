<script lang="ts">
	import conditionStatusStore from '$lib/globals/conditionStatusStore.svelte';
	import temperatureRangeStore from '$lib/globals/temperatureRangeStore.svelte';
	import type { ConditionStatus } from '$lib/types/condition';
	import type { TemperatureRange } from '$lib/types/temperature';
	import { onDestroy, onMount } from 'svelte';
	import { getSceneTheme } from './parseTheme';
	import { SceneManager } from './SceneManager/SceneManager';

	// Props
	let temperatureRange = $state<TemperatureRange | null>(null);
	let conditionStatus = $state<ConditionStatus | null>(null);
	let currentSceneTheme = $derived(() => {
		return getSceneTheme(temperatureRange, conditionStatus);
	});

	// Store Subscriptions
	temperatureRange = $temperatureRangeStore;
	conditionStatus = $conditionStatusStore;

	// Update Scene Theme
	$effect(() => {
		if (!plantSceneManager) {
			return;
		}
		
		const theme = currentSceneTheme();
		plantSceneManager.setTheme(theme);
	});

	// Variables
	let raf = 0;
	let canvas: HTMLCanvasElement;
	let plantSceneManager: SceneManager;
	
	function render() {
		raf = requestAnimationFrame(render);
		plantSceneManager.update();
	}

	function onResizeHandler() {
		plantSceneManager.onWindowResize();
	}

	onMount(() => {
		if (canvas) {
			const theme = currentSceneTheme();
			plantSceneManager = new SceneManager(canvas, theme);

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
