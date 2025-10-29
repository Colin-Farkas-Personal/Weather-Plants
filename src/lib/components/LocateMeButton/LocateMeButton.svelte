<script lang="ts">
	import GpsBoldIcon from '~icons/ph/gps-bold';
	import { Button } from 'bits-ui';
	import { goto } from '$app/navigation';

	// Logic
	function setGeolocationCoordinates() {
		if (!navigator.geolocation) {
			throw new Error('Geolocation is not supported by your browser');
		}

		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords;
				goto(`/?lat=${latitude}&lon=${longitude}`);
			},
			(error) => {
				console.error('Error getting geolocation:', error);
				alert('Unable to retrieve your location. Please try again later.');
			},
		);
	}
</script>

<Button.Root
	type="submit"
	data-action="current"
	class="locate-me-button"
	onclick={setGeolocationCoordinates}
>
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
