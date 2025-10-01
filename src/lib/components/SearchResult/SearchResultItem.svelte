<script lang="ts">
	import type { Snippet } from 'svelte';

	interface SearchResultItem {
		name: string;
		country: string;
		region: string;
		Icon?: Snippet;
	}

	let { name, country, region, Icon }: SearchResultItem = $props();
</script>

<li class="search-result-item">
	{#if Icon}
		<a href={`/overview/${name} ${country}`} class="search-result-item-link with-icon">
			<div class="search-result-item-link-details">
				<h3 class="search-result-item-link-details-heading">{name}</h3>
				<p>{country}</p>
				<p>{region}</p>
			</div>
			<span class="search-result-item-link-icon" aria-hidden="true">{@render Icon?.()}</span>
		</a>
	{:else}
		<a href={`/overview/${name} ${country}`} class="search-result-item-link no-icon">
			<h3 class="search-result-item-link-heading">{name}</h3>
			<div class="search-result-item-link-details">
				<p>{country}</p>
				<p>{region}</p>
			</div>
		</a>
	{/if}
</li>

<style lang="scss">
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

			&:hover {
				border-color: var(--warm-white-800);
			}

			&:active {
				border-color: var(--warm-white-900);
			}

			&.with-icon {
				.search-result-item-link-details {
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
</style>
