<script lang="ts">
	import GpsBoldIcon from '~icons/ph/gps-bold';
	import { Button } from 'bits-ui';
</script>

<Button.Root type="submit" name="locateMe" class="locate-me-button">
	<GpsBoldIcon class="icon icon-medium" aria-hidden="true" />
	My current location
</Button.Root>

<style lang="scss">
	:global {
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
	}
</style>
