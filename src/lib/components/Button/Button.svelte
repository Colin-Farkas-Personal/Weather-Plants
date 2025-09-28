<script lang="ts">
	import ThermometerCold from '$lib/components/Icon/Bold/ThermometerCold.svelte';

	interface TextInputProps {
		name: string;
		label: string;
	}

	let { name, label }: TextInputProps = $props();
</script>

<button type="submit" {name} class="button"><ThermometerCold />{label}</button>

<style lang="scss">
	@use '$lib/styles/accessibility';

	.button {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 8px;

		width: 100%;
		height: 64px;

		outline: none;
		border: 2px solid var(--warm-white-700);
		border-radius: 60px;
		background-color: var(--warm-white-500);

		font-size: 18px;
		font-weight: bold;
		color: var(--warm-white-900);

		cursor: pointer;

		&:hover {
			border-color: var(--warm-white-800);
		}

		&:focus-within {
			border-color: var(--warm-white-900);
		}
	}
</style>
