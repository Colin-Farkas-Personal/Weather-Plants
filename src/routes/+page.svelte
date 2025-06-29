<script lang="ts">
    import MainTemperature from '$lib/components/MainTemperature/MainTemperature.svelte';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<span>{data.lastUpdated}</span>
<h1>{data.location.name}</h1>
<p>{data.location.country}</p>

<MainTemperature temperature={data.temperature} feelsLike={data.feelsLike} />

<h3>L: {data.dailyRange.min}°C - {data.condition.text} - {data.dailyRange.max}°C</h3>