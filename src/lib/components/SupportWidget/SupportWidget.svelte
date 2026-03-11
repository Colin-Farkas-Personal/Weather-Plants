<script lang="ts">
	import Button from '../Button/Button.svelte';
	import HandHeartIconBold from '~icons/ph/hand-heart-bold';
	import CoffeeIconBold from '~icons/ph/coffee-bold';

	interface SupportWidgetProps {
		type: 'compact' | 'full';
	}

	let { type }: SupportWidgetProps = $props();

	let likes = $state<number>(0);

	function addLike() {
		// Placeholder function for adding a like
		console.log('Liked!');
		likes += 1;
	}
</script>

<article class={`support-widget ${type}`}>
	{#if type === 'full'}
		<p>If you like the app, show some love ❤️ or buy me a coffee ☕</p>
	{/if}
	<div class="actions">
		<Button className="like" onClick={addLike}>
			<HandHeartIconBold />
			{likes}
		</Button>
		<Button
			className="buy-me-a-coffee"
			onClick={() => window.open('https://www.buymeacoffee.com/colinfarkas', '_blank')}
		>
			<CoffeeIconBold />
			BUY ME A COFFEE
		</Button>
	</div>
</article>

<style lang="scss">
	.support-widget {
		&.compact {
			width: 300px;
			padding: 8px;
			border-radius: 60px;
		}

		&.full {
			width: 380px;
			padding: 24px 18px;
		}
		display: flex;
		flex-direction: column;
		align-items: stretch;

		gap: 18px;
		border-radius: 30px;

		background-color: #0a0a0a;
		text-align: center;

		p {
			color: #a1a1a1;
			font-size: 1rem;
			font-weight: 500;
		}

		.actions {
			display: flex;
			gap: 8px;

			:global(button) {
				// Buttons take up 50% each in width
				flex: 1;
				width: 100%;

				border: none;
				padding: 0.5rem 1rem;
				font-size: 16px;
				font-weight: bold;
				line-height: 1.25;
				text-align: center;

				:global(svg) {
					flex-shrink: 0;
					width: 24px;
					height: 24px;
				}
			}

			// TODO: Hearts that fly up from the mouse as you hover over the like button
			:global(.like) {
				color: #ff4848;
				background-color: white;
			}

			// TODO: Coffee beans that fly up from the mouse as you hover over the buy me a coffee button
			:global(.buy-me-a-coffee) {
				color: #1b1b02;
				background-color: #fbff00;
			}
		}
	}
</style>
