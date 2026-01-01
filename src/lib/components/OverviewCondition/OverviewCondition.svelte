<script lang="ts">
	import type { CurrentCondition } from '$lib/globals/conditionStatusStore.svelte';
	import WeatherConditionIcon from '../Icon/WeatherConditionIcon.svelte';

	interface Props {
		status: CurrentCondition['status'];
		label: CurrentCondition['label'];
	}

	let { status, label }: Props = $props();
</script>

<div class="overview-condition" role="status" aria-live="polite">
	<span class="icon" aria-hidden="true">
		<WeatherConditionIcon conditionStatus={status} />
	</span>
	<span role="status" class="label" aria-label={`Weather condition: ${label}`}>
		{label}
	</span>
</div>

<style lang="scss">
	@use '/src/lib/styles/breakpoints';

	.overview-condition {
		display: inline-flex;
		gap: var(--fluid-size-em-mini);
		align-items: center;
		justify-content: center;
		padding: var(--fluid-size-em-mini) var(--fluid-size-em-small);

		width: fit-content;

		border-radius: var(--fluid-size-em-large-plus);
		background-color: var(--theme-action-bg-primary);
		color: var(--theme-text-primary);

		.icon {
			flex-shrink: 0;
		}

		.label {
			text-align: left;
			font-weight: bold;
			font-size: var(--fluid-size-em-small);

			max-width: clamp(180px, 5cqi, 240px); // TODO: Update to EM
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
