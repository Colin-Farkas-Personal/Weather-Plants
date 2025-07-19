<script lang="ts">
	// 3D
	import { onDestroy, onMount } from 'svelte';
	import * as THREE from 'three';
	import { animate, initScene, loadModel, onResize } from './PlantScene.helpers';

    let _container: HTMLElement;
    let _renderer: THREE.WebGLRenderer;
    let _camera: THREE.PerspectiveCamera;
    let _animationFramerId: number;

	onMount(() => {
        if (typeof window !== 'undefined') {
            const container = document.getElementById('three-container');
            const { scene, camera, renderer, controls } = initScene(container as HTMLElement);
            loadModel('/models/cactus_day.glb', scene);
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
