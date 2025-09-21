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
					<form method="POST" action="?/goTo" class="form-search-location">
						<input
							type="text"
							name="location"
							placeholder="London...Madrid...Athens..."
						/>
						<button formaction="?/goTo">Search</button>
					</form>
				</div>
			</PrimarySection>

			<SecondarySection>
				{#snippet Scene()}
					<div class="hero-section">
						<p>Weather Pot - Weather embodied</p>
					</div>
				{/snippet}
			</SecondarySection>
		{:else if $orientation === 'portrait'}
			<SecondarySection heading="What's the weather like in...?" />

			<PrimarySection>
				<form method="POST" action="?/goTo" class="form-search-location">
					<input type="text" name="location" placeholder="London...Madrid...Athens..." />
					<button formaction="?/goTo">Search</button>
				</form>
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

	.form-search-location {
		display: flex;
		gap: 0.5rem;
		flex-direction: column;
	}

	.hero-section > * {
		text-align: center;
		text-wrap: balance;
		font-weight: bold;
		font-size: var(--fluid-size-em-large);
		color: var(--warm-white-text-tertiary);
	}

	:global {
		.main-page {
			background-color: var(--theme-bg-primary);
		}
	}
</style>
