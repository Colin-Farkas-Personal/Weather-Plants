<script lang="ts">
	import MagnifyingGlassBoldIcon from '~icons/ph/magnifying-glass-bold';
</script>

<label class="text-input">
	<input
		id="location"
		name="input"
		placeholder="Madrid..."
		required
		aria-label="Enter a location"
	/>
	<button type="submit" data-action="input" aria-label="Search">
		<MagnifyingGlassBoldIcon class="icon-medium" />
	</button>
</label>

<style lang="scss">
	@use '$lib/styles/accessibility';

	.text-input {
		display: flex;
		align-items: center;

		height: 64px;
		padding: 8px;
		padding-left: 40px;

		border: 2px solid var(--warm-white-border-primary);
		border-radius: 60px;
		background-color: var(--warm-white-bg-primary);

		cursor: text;

		&:hover {
			border-color: var(--warm-white-800);
		}

		&:focus-within {
			border-color: var(--warm-white-900);
		}

		input {
			flex: 1 1 auto;
			min-width: 0;
			outline: none;
			border: none;
			background: none;

			font-size: 18px;
			font-weight: 500;
			color: var(--warm-white-text-primary);

			&::placeholder {
				color: var(--warm-white-text-secondary);
			}
		}

		button {
			display: flex;
			align-items: center;
			justify-content: center;

			--btn-size: 46px;
			width: var(--btn-size);
			height: var(--btn-size);
			flex: 0 0 var(--btn-size);
			flex-shrink: 0;
			border-radius: 50%;

			border: none;
			background-color: var(--warm-white-text-primary-inversed);
			color: var(--warm-white-text-tertiary);
			cursor: pointer;

			@include accessibility.focus-visible(var(--warm-white-900));
		}
	}
</style>
