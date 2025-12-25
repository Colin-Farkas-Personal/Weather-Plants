<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from 'bits-ui';
	import type { Snippet } from 'svelte';

	interface SearchResultItem {
		lat: number;
		lon: number;
		city: string;
		country: string;
		region: string;
		Icon?: Snippet;
	}

	let { lat, lon, city: name, country, region, Icon }: SearchResultItem = $props();

	function goToOverviewPage() {
		const params = new URLSearchParams({
			lat: String(lat),
			lon: String(lon),
			name,
			country,
		});
		goto(`/overview?${params.toString()}`);
	}
</script>

<li class="search-result-item">
	{#if Icon}
		<Button.Root
			onclick={goToOverviewPage}
			class="search-result-item-link with-icon"
			data-sveltekit-preload-code="eager"
			data-sveltekit-preload-data="off"
		>
			<div class="search-result-item-link-details">
				{#if name}
					<h3 class="search-result-item-link-details-heading">{name}</h3>
				{/if}
				{#if country}
					<p>{country}</p>
				{/if}
				{#if region}
					<p>{region}</p>
				{/if}
			</div>
			<span class="search-result-item-link-icon" aria-hidden="true">{@render Icon?.()}</span>
		</Button.Root>
	{:else}
		<Button.Root
			onclick={goToOverviewPage}
			class="search-result-item-link no-icon"
			data-sveltekit-preload-code="eager"
			data-sveltekit-preload-data="off"
		>
			{#if name}
				<h3 class="search-result-item-link-heading">{name}</h3>
			{/if}
			<div class="search-result-item-link-details">
				{#if country}
					<p>{country}</p>
				{/if}
				{#if region}
					<p>{region}</p>
				{/if}
			</div>
		</Button.Root>
	{/if}
</li>

<style lang="scss">
	:global {
		.search-result-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 3rem;

			width: 100%;
			text-decoration: none;

			.search-result-item-link {
				display: flex;
				align-items: center;
				justify-content: space-between;
				gap: 1rem;

				width: 100%;
				padding: 20px;

				background-color: var(--warm-white-500);
				border: 2px solid var(--warm-white-700);
				border-radius: 24px;

				text-decoration: none;
				cursor: pointer;

				&:hover {
					border-color: var(--warm-white-800);
				}

				&:active {
					border-color: var(--warm-white-900);
				}

				&.with-icon {
					.search-result-item-link-details {
						flex: 1;
						display: flex;
						flex-direction: column;
						align-items: flex-start;
						gap: 6px;

						text-align: left;

						// search-result-item-link-details-heading
						&-heading {
							font-size: 20px;
							font-weight: bold;
							color: var(--warm-white-900);
						}

						p {
							font-size: 16px;
							font-weight: 500;
							color: var(--warm-white-800);
						}
					}

					.search-result-item-link-icon {
						flex: 0 0 auto;

						color: var(--warm-white-900);
					}
				}

				&.no-icon {
					.search-result-item-link-heading {
						text-align: left;
						font-size: 20px;
						font-weight: bold;
						color: var(--warm-white-900);
					}

					.search-result-item-link-details {
						flex: 1;
						display: flex;
						flex-direction: column;
						align-items: flex-end;
						gap: 6px;

						p {
							text-align: right;
							font-size: 16px;
							font-weight: 500;
							color: var(--warm-white-800);
						}
						@media screen and (max-width: 350px) {
							align-items: flex-start;
							text-align: left;
						}
					}
					@media screen and (max-width: 350px) {
						flex-direction: column;
						justify-content: center;
						align-items: flex-start;
					}
				}
			}
		}
	}
</style>
