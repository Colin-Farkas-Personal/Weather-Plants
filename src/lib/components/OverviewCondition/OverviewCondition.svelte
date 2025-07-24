<script lang="ts">
	import type { Condition } from '$lib/types/weather';
	import WeatherConditionIcon from '../Icon/WeatherConditionIcon.svelte';

	interface Props {
		condition: Condition['text'];
	}

	let { condition }: Props = $props();
</script>

<div class="overview-condition" role="status" aria-live="polite">
	<span class="icon" aria-hidden="true">
		<WeatherConditionIcon {condition} />
	</span>
	<span class="label" aria-label={`Weather condition: ${condition}`}>
		{condition}
	</span>
</div>

<style lang="scss">
	@use '/src/lib/styles/breakpoints';

	.overview-condition {
		display: inline-flex;
		gap: 0.5rem;
		align-items: center;
		justify-content: center;
		padding: 6px 20px;
		max-width: 100%;

		border-radius: 3rem;
		border: 0.125rem solid #ae652c;
		background-color: #ca7b3c;
		color: #fffcf9;

		.icon {
			flex-shrink: 0;
		}

		.label {
			flex: 1;

			text-wrap: balance;
			text-align: left;
			font-size: 0.875rem;
			font-weight: bold;
			line-height: 1.4;
		}
	}

	@media screen and (width > breakpoints.$mobile) {
		.overview-condition .label {
			font-size: 1.25rem;
		}
	}
</style>
