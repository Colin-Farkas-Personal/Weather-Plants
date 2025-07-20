<script lang="ts">
	import OverviewCondition from '$lib/components/OverviewCondition/OverviewCondition.svelte';
	import OverviewMax from '$lib/components/OverviewMax/OverviewMax.svelte';
	import OverviewMin from '$lib/components/OverviewMin/OverviewMin.svelte';
	import OverviewTemperature from '$lib/components/OverviewTemperature/OverviewTemperature.svelte';
	import PlantScene from '$lib/components/PlantScene/PlantScene.svelte';

	// Props
	let { data } = $props();
</script>

<!-- Mount point for Three.js canvas -->
<PlantScene temperature={data.temperature} />

<!-- UI content -->
<h1>{data.location.name}</h1>
<p>{data.location.country}</p>

<OverviewTemperature temperature={data.temperature} feelsLike={data.feelsLike} />
<OverviewMin minTemp={data.dailyRange.min} />
<OverviewCondition condition={data.condition.text} />
<OverviewMax maxTemp={data.dailyRange.max} />
