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
		--border-width: var(--fluid-size-em-mini-minus);
		// --------

		display: inline-flex;
		gap: var(--fluid-size-em-mini);
		align-items: center;
		justify-content: center;
		padding: var(--fluid-size-em-mini) var(--fluid-size-em-small);

		border-radius: var(--fluid-size-em-large-plus);
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
			font-size: var(--fluid-size-em-small);

			max-width: clamp(180px, 5cqi, 240px);
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		:global {
			.icon svg {
				width: var(--fluid-size-em-medium);
				block-size: auto;
			}
		}
	}
</style>
