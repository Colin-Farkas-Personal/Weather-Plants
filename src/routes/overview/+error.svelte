<script lang="ts">
	import { page } from '$app/state';
</script>

<main class="error">
	<h1>Location not found</h1>
	<p>There seems to be no location named <b>{page.params.slug}</b></p>
</main>

<style lang="scss">
	.error {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: var(--fluid-size-em-small);

		width: 100dvw;
		height: 100dvh;

		color: orange;

		h1 {
			font-size: 64px;
		}

		p {
			font-size: 32px;

			b {
				padding: clamp(4px, var(--fluid-size-vmin-medium), 8px)
					clamp(8px, var(--fluid-size-vmin-medium), 18px);
				border-radius: 1.875rem;

				background-color: orange;
				color: white;
			}
		}
	}
</style>
