<script lang="ts">
    import TemperatureMain from '$lib/TemperatureMain.svelte';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<h1>{data.location.name}</h1>
<p>{data.location.country}</p>

<TemperatureMain temperature={data.temperature} feelsLike={data.feelsLike} />

<h3>L: {data.dailyRange.min}°C - {data.condition.text} - {data.dailyRange.max}°C</h3>