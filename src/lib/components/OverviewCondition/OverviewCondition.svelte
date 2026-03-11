<script lang="ts">
	import type { CurrentCondition } from '$lib/globals/conditionStatusStore.svelte';
	import type { CurrentAstro } from '$lib/utilities/current-astro';
	import AstroConditionIcon from '../Icon/AstroConditionIcon.svelte';
	import WeatherConditionIcon from '../Icon/WeatherConditionIcon.svelte';

	interface Props {
		status: CurrentCondition['status'] | CurrentAstro['status'];
		label: CurrentCondition['label'] | CurrentAstro['label'];
	}

	let { status, label }: Props = $props();
</script>

{#key status}
	<div class="overview-condition" role="status" aria-live="polite">
		<span class="icon" aria-hidden="true">
			{#if status === 'SUNRISE' || status === 'SUNSET'}
				<AstroConditionIcon astroStatus={status} />
			{:else}
				<WeatherConditionIcon conditionStatus={status} />
			{/if}
		</span>
		<span role="status" class="label" aria-label={`Weather condition: ${label}`}>
			{label}
		</span>
	</div>
{/key}

<style lang="scss">
	@use '/src/lib/styles/breakpoints';

	.overview-condition {
		display: inline-flex;
		gap: var(--fluid-size-em-mini-minus);
		align-items: center;
		justify-content: center;
		padding: var(--fluid-size-em-mini) var(--fluid-size-em-small);

		width: fit-content;

		border-radius: var(--fluid-size-em-large-plus);
		background-color: var(--theme-action-bg-primary);
		color: var(--theme-text-primary);

		animation: bounce-out-back 450ms
			linear(
				0,
				0.008 1.1%,
				0.034 2.3%,
				0.134 4.9%,
				0.264 7.3%,
				0.683 14.3%,
				0.797 16.5%,
				0.89 18.6%,
				0.967 20.7%,
				1.027 22.8%,
				1.073 25%,
				1.104 27.3%,
				1.123 30.6%,
				1.119 34.3%,
				1.018 49.5%,
				0.988 58.6%,
				0.985 65.2%,
				1 84.5%,
				1
			);

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

	@keyframes bounce-out-back {
		0% {
			transform: scale(0.95);
		}
		100% {
			transform: scale(1);
		}
	}
</style>
