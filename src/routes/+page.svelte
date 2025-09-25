<script lang="ts">
	import PageLayout from '$lib/components/Page/PageLayout.svelte';
</script>

<PageLayout heading="What's the weather like in...?">
	{#snippet PrimarySectionContent()}
		<div class="main-page-selection">
			<form method="POST" action="?/goTo" class="form-search-location">
				<input type="text" name="location" placeholder="London...Madrid...Athens..." />
				<button>Search</button>
			</form>
		</div>
	{/snippet}
</PageLayout>

<style lang="scss">
	.main-page-selection {
		display: flex;
		flex-direction: column;

		width: 100%;
	}

	.form-search-location {
		display: flex;
		gap: 0.5rem;
		flex-direction: column;
	}

	:global {
		.main-page {
			background-color: var(--theme-bg-primary);
		}
	}
</style>
