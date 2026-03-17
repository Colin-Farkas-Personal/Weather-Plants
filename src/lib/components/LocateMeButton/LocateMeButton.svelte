<script lang="ts">
	import GpsBoldIcon from '~icons/ph/gps-bold';
	import { Button } from 'bits-ui';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	let isLocating = $state(false);

	let alreadyHasLocation = $derived(
		page.url.searchParams.has('lat') && page.url.searchParams.has('lon'),
	);

	// Logic
	function setGeolocationCoordinates() {
		if (isLocating || alreadyHasLocation) return;

		if (!navigator.geolocation) {
			throw new Error('Geolocation is not supported by your browser');
		}

		isLocating = true;

		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords;
				goto(`/?lat=${latitude}&lon=${longitude}`);
				isLocating = false;
			},
			(error) => {
				console.error('Error getting geolocation:', error);
				alert('Unable to retrieve your location. Please try again later.');
				isLocating = false;
			},
		);
	}
</script>

<Button.Root
	type="submit"
	data-action="current"
	class="locate-me-button"
	disabled={isLocating || alreadyHasLocation}
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
			border: 2px solid var(--scene-border-primary, var(--warm-white-700));
			border-radius: 60px;
			background-color: var(--scene-bg-primary, var(--warm-white-500));

			text-align: left;
			font-size: 18px;
			font-weight: bold;
			color: var(--scene-text-primary, var(--warm-white-900));

			cursor: pointer;

			.icon {
				flex: 0 0 auto;
			}

			&:hover {
				border-color: var(--scene-border-hover, var(--warm-white-800));
			}
			&:active,
			&:focus-visible {
				border-color: var(--scene-border-focus, var(--warm-white-900));
			}
		}
	}
</style>
