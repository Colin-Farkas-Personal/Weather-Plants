<script lang="ts">
	interface SearchResultItem {
		name: string;
		country: string;
		region: string;
	}

	let { name, country, region }: SearchResultItem = $props();
</script>

<a href={`/overview/${name} ${country}`} class="search-result-item">
	<h3 class="search-result-item-heading">{name}</h3>
	<div class="search-result-item-details">
		<p>{country}</p>
		<p>{region}</p>
	</div>
</a>

<style lang="scss">
	.search-result-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 3rem;

		padding: 20px;
		width: 100%;

		background-color: var(--warm-white-500);
		border: 2px solid var(--warm-white-700);
		border-radius: 24px;

		text-decoration: none;

		&:hover {
			border-color: var(--warm-white-800);
		}

		.search-result-item-heading {
			font-size: 20px;
			font-weight: bold;
			color: var(--warm-white-900);
		}

		.search-result-item-details {
			display: flex;
			flex-direction: column;
			align-items: end;

			& * {
				font-size: 16px;
				font-weight: 500;
				color: var(--warm-white-800);
			}
		}
	}
</style>
