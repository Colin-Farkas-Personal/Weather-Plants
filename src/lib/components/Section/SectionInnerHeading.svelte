<script lang="ts">
	import { windowOrientation } from '$lib/globals/windowStore';

	interface OverviewRangeDescriptiveProps {
		heading?: string;
		subHeading?: string;
	}

	let { heading, subHeading }: OverviewRangeDescriptiveProps = $props();

	// Logic
	let orientation = windowOrientation;
</script>

{#if heading && subHeading}
	<hgroup id="section-inner-heading" class={`section-inner-heading ${$orientation}`}>
		<h1 class="heading">{heading}</h1>
		<p class="description">{subHeading}</p>
	</hgroup>
{:else if heading}
	<h1 class={`section-inner-heading heading ${$orientation}`}>{heading}</h1>
{/if}

<style lang="scss">
	.section-inner-heading {
		display: flex;
		flex-direction: column;
		align-items: center;

		text-align: center;
	}

	.portrait {
		.heading {
			color: var(--theme-text-primary-inversed);
			font-size: var(--fluid-size-em-medium-plus);
		}

		.description {
			color: var(--theme-text-secondary-inversed);
			font-size: var(--fluid-size-em-small-plus);
			font-weight: 500;
		}
	}

	.landscape {
		.heading {
			color: var(--theme-text-primary-inversed);
			font-size: var(--fluid-size-em-medium-plus);
		}

		.description {
			color: var(--theme-text-secondary-inversed);
			font-size: var(--fluid-size-em-small-plus);
			font-weight: 500;
		}
	}
</style>
