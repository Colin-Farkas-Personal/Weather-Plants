<script lang="ts">
	import type { Condition } from '$lib/types/weather';
	import WeatherConditionIcon from '../Icon/WeatherConditionIcon.svelte';

	interface Props {
		condition: Condition['text'];
	}

	let { condition }: Props = $props();
</script>

<div class="overview-condition"><WeatherConditionIcon condition={condition} />{condition}</div>

<style lang="scss">
	.overview-condition {
		display: flex;
		gap: .25rem;
		align-items: center;
		padding: 2px 12px;

		border-radius: 1.875rem;
		border: .125rem solid #AE652C;
		background-color: #CA7B3C;
		color: #FFFCF9;

		font-size: 1.25rem;
		font-weight: bold;
	}
</style>
