<script lang="ts">
	import ThermometerCold from '$lib/components/Icon/Bold/ThermometerCold.svelte';

	interface LocateMeButtonProps {
		name?: string; // default 'locateMe'
		label?: string; // default label text
	}

	let { name = 'locateMe', label = 'My current location' }: LocateMeButtonProps = $props();
</script>

<button type="submit" {name} class="locate-me-button">
	<span class="icon" aria-hidden="true"><ThermometerCold /></span>
	{label}
</button>

<style lang="scss">
	.locate-me-button {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 8px;

		width: 100%;
		height: 64px;
		padding-left: 20px;

		outline: none;
		border: 2px solid var(--warm-white-700);
		border-radius: 60px;
		background-color: var(--warm-white-500);

		text-align: left;
		font-size: 18px;
		font-weight: bold;
		color: var(--warm-white-900);

		cursor: pointer;

		.icon {
			flex: 0 0 auto;
		}

		&:hover {
			border-color: var(--warm-white-800);
		}
		&:active,
		&:focus-visible {
			border-color: var(--warm-white-900);
		}
	}
</style>
