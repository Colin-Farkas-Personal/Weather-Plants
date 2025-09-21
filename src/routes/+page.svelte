<script lang="ts">
	import PrimarySection from '$lib/components/Section/PrimarySection.svelte';
	import SecondarySection from '$lib/components/Section/Secondary/SecondarySection.svelte';
	import SectionContainer from '$lib/components/Section/SectionContainer.svelte';
	import { windowOrientation } from '$lib/globals/windowStore';

	// Logic
	let orientation = windowOrientation;
</script>

<article class="main">
	<SectionContainer className="main-page">
		{#if $orientation === 'landscape'}
			<PrimarySection>
				<div class="main-page-inner">
					<h1 class="heading">What's the weather like in...?</h1>
					<input type="text" placeholder="London...Madrid...Athens..." />
				</div>
			</PrimarySection>

			<SecondarySection />
		{:else if $orientation === 'portrait'}
			<SecondarySection heading="What's the weather like in...?" subHeading="Bye" />

			<PrimarySection>
				<p>Hello, World!</p>
			</PrimarySection>
		{/if}
	</SectionContainer>
</article>

<style lang="scss">
	.main-page-inner {
		display: flex;
		flex-direction: column;
		gap: 60px;
		margin: 0 5rem;
	}
	.heading {
		text-align: center;
		color: var(--theme-text-primary);
		font-size: var(--fluid-size-em-medium-plus);
		font-weight: bold;
		text-wrap: unset;
	}
	:global {
		.main-page {
			background-color: var(--theme-bg-primary);
		}
	}
</style>
