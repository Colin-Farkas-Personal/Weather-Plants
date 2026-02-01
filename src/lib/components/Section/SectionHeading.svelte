<script lang="ts">
	import { windowOrientation } from '$lib/globals/windowStore';
	import type { HexColor } from '../PlantScene/themes/theme.types';

	interface SectionHeadingProps {
		heading?: string;
		headingColor?: HexColor;
		subHeading?: string;
		subheadingColor?: HexColor;
	}

	let { heading, subHeading, headingColor, subheadingColor }: SectionHeadingProps = $props();

	// Logic
	let orientation = windowOrientation;
</script>

{#if heading && subHeading}
	<hgroup id="section-heading" class={`section-heading ${$orientation}`}>
		<h1 class="heading" style="color: {headingColor}">{heading}</h1>
		<p class="description" style="color: {subheadingColor}">{subHeading}</p>
	</hgroup>
{:else if heading}
	<h1 class={`section-heading heading ${$orientation}`} style="color: {headingColor}">
		{heading}
	</h1>
{/if}

<style lang="scss">
	.section-heading {
		display: flex;
		flex-direction: column;
		align-items: center;

		text-align: center;
	}

	.portrait {
		margin-bottom: 1rem;

		.heading {
			color: var(--theme-text-primary);
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
