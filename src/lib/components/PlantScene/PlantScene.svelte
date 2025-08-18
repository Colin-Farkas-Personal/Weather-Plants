<script lang="ts">
	import type { TemperatureRange } from '$lib/types/temperature';
	import { onDestroy, onMount } from 'svelte';
	import { SceneManager } from './SceneManager';
	import temperatureRangeStore from '$lib/globals/temperatureRangeStore.svelte';
	import { getSceneTheme } from './parseTheme';
	import conditionStatusStore from '$lib/globals/conditionStatusStore.svelte';
	import type { ConditionStatus } from '$lib/types/condition';

	// Props
	let temperatureRange = $state<TemperatureRange>('Hot');
	let conditionStatus = $state<ConditionStatus>('SUNNY');
	let currentSceneTheme = $derived(() => {
		return getSceneTheme(temperatureRange, conditionStatus);
	});

	// Update Scene Theme
	$effect(() => {
		if (!plantSceneManager) {
			return;
		}

		console.error("currentSceneTheme:", currentSceneTheme(), "plantsceneManager:", plantSceneManager);
		plantSceneManager.setTheme(currentSceneTheme());
	});

	// Variables
	let raf = 0;
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
			plantSceneManager = new SceneManager(canvas, currentSceneTheme());
			render();
		}

		temperatureRangeStore.subscribe((range) => {
			if (range) {
				temperatureRange = range;
			}
		});
		conditionStatusStore.subscribe((condition) => {
			if (condition) {
				conditionStatus = condition;
			}
		})
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
