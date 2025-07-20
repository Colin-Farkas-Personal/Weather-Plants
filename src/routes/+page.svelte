<script lang="ts">
	import MainCondition from '$lib/components/MainCondition/MainCondition.svelte';
	import MainTemperature from '$lib/components/MainTemperature/MainTemperature.svelte';
	import PlantScene from '$lib/components/PlantScene/PlantScene.svelte';

	// Props
	let { data } = $props();
</script>

<!-- Mount point for Three.js canvas -->
<PlantScene temperature={data.temperature}/>

<!-- UI content -->
<h1>{data.location.name}</h1>
<p>{data.location.country}</p>

<MainTemperature temperature={data.temperature} feelsLike={data.feelsLike} />
<MainCondition
	condition={data.condition.text}
	min={data.dailyRange.min}
	max={data.dailyRange.max}
/>
