<script lang="ts">
	import MainCondition from '$lib/components/MainCondition/MainCondition.svelte';
	import MainTemperature from '$lib/components/MainTemperature/MainTemperature.svelte';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<h1>{data.location.name}</h1>
<p>{data.location.country}</p>

<MainTemperature temperature={data.temperature} feelsLike={data.feelsLike} />
<MainCondition condition={data.condition.text} min={data.dailyRange.min} max={data.dailyRange.max} />