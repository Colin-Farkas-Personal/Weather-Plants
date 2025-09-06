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
		// Variables
		--border-width: 0.2em;
		// --------

		display: inline-flex;
		gap: 0.5rem;
		align-items: center;
		justify-content: center;
		padding: 0.5em 1em;

		border-radius: 3em;
		border-width: var(--border-width);
		border-style: solid;
		border-color: var(--theme-border-primary);
		background-color: var(--theme-bg-secondary);
		color: var(--theme-text-primary);

		.icon {
			flex-shrink: 0;
		}

		.label {
			text-align: left;
			font-weight: bold;
			font-size: 1em;

			max-width: clamp(180px, 5cqi, 240px);
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		:global {
			.icon svg {
				width: clamp(24px, 5cqi, 28px);
				block-size: auto;
			}
		}
	}
</style>
