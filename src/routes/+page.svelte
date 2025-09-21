<script lang="ts">
	import PrimarySection from '$lib/components/Section/PrimarySection.svelte';
	import SecondarySection from '$lib/components/Section/SecondarySection.svelte';
	import SectionContainer from '$lib/components/Section/SectionContainer.svelte';
	import { windowOrientation } from '$lib/globals/windowStore';

	// Logic
	let orientation = windowOrientation;
</script>

<article class="main">
	<SectionContainer className="main-page">
		{#if $orientation === 'landscape'}
			<PrimarySection heading="What's the weather like in...?">
				<div class="main-page-selection">
					<input type="text" placeholder="London...Madrid...Athens..." />
				</div>
			</PrimarySection>

			<SecondarySection>
				{#snippet Scene()}
					<div>
						<p>Weather Pot - Weather embodied</p>
					</div>
				{/snippet}
			</SecondarySection>
		{:else if $orientation === 'portrait'}
			<SecondarySection heading="What's the weather like in...?" subHeading="Bye" />

			<PrimarySection>
				<p>Hello, World!</p>
			</PrimarySection>
		{/if}
	</SectionContainer>
</article>

<style lang="scss">
	.main-page-selection {
		display: flex;
		flex-direction: column;

		width: 100%;
		margin-top: 4rem;
	}

	:global {
		.main-page {
			background-color: var(--theme-bg-primary);
		}
	}
</style>
