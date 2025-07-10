<script lang="ts">
	import type { Condition, DailyRange } from '$lib/types/weather';
	import CloudLigtningBold from '$lib/components/Icon/Bold/CloudLigtningBold.svelte';
	import WeatherConditionIcon from '../Icon/WeatherConditionIcon.svelte';

	interface Props {
		condition: Condition['text'];
		min: DailyRange['min'];
		max: DailyRange['max'];
	}

	let { condition, min, max }: Props = $props();
</script>

<div>
  <span>L: {min}</span>
  <span>•</span>
  <span><WeatherConditionIcon condition={condition} />{condition}</span>
  <span>•</span>
  <span>H: {max}</span>
</div>
