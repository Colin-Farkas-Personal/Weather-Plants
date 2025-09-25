<script lang="ts">
	import { windowOrientation } from '$lib/globals/windowStore';

	interface SectionHeadingProps {
		heading?: string;
		subHeading?: string;
	}

	let { heading, subHeading }: SectionHeadingProps = $props();

	// Logic
	let orientation = windowOrientation;
</script>

{#if heading && subHeading}
	<hgroup id="section-heading" class={`section-heading ${$orientation}`}>
		<h1 class="heading">{heading}</h1>
		<p class="description">{subHeading}</p>
	</hgroup>
{:else if heading}
	<h1 class={`section-heading heading ${$orientation}`}>{heading}</h1>
{/if}

<style lang="scss">
	.section-heading {
		display: flex;
		flex-direction: column;
		align-items: center;

		text-align: center;
	}

	.portrait {
		margin-bottom: 1.5rem;

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
			color: var(--theme-text-primary);
			font-size: var(--fluid-size-em-medium-plus);
		}

		.description {
			color: var(--theme-text-secondary);
			font-size: var(--fluid-size-em-small-plus);
			font-weight: 500;
		}
	}
</style>
