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
		<WeatherConditionIcon />
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
		padding: clamp(4px, 1vmin, 8px) clamp(12px, 2vmin, 20px);
		max-width: 100%;

		border-radius: 3rem;
		border-width: clamp(3px, 1vmin, 4px);
		border-style: solid;
		border-color: var(--theme-border-primary);
		background-color: var(--theme-bg-secondary);
		color: var(--theme-text-primary);

		.icon {
			flex-shrink: 0;
		}

		.label {
			text-wrap: balance;
			text-align: left;
			font-weight: bold;
			font-size: clamp(18px, 5vmin, 24px);
		}

		:global {
			.icon svg {
				width: clamp(24px, var(--typography-font-size-vmin), 32px);
				height: clamp(24px, var(--typography-font-size-vmin), 32px);
			}
		}
	}
</style>
