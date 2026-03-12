<script lang="ts">
	import Button from '../Button/Button.svelte';
	import HandHeartIconBold from '~icons/ph/hand-heart-bold';
	import HeartFill from '~icons/ph/heart-fill';
	import CoffeeIconBold from '~icons/ph/coffee-bold';
	import { onMount } from 'svelte';

	interface SupportWidgetProps {
		type: 'compact' | 'full';
	}

	let { type }: SupportWidgetProps = $props();

	let likes = $state<number>(0);
	let liked = $state(false);
	let animating = $state(false);
	let phase = $state<'idle' | 'pulse' | 'slide-out' | 'heart-in'>('idle');
	let floatingHearts = $state<number[]>([]);

	const STORAGE_KEY = 'weather-plants:liked';

	onMount(() => {
		// Load liked state from localStorage
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored === 'true') {
			liked = true;
		}
	});

	$effect(() => {
		// Sync liked state to localStorage
		localStorage.setItem(STORAGE_KEY, String(liked));
	});

	function addLike() {
		if (liked || animating) return;
		animating = true;
		console.log('Liked!');

		// Phase 1: Button pulse
		phase = 'pulse';

		setTimeout(() => {
			// Phase 2: Hand icon slides right and fades
			phase = 'slide-out';

			setTimeout(() => {
				// Phase 3: Filled heart appears with pulse, count increases
				liked = true;
				likes += 1;
				// localStorage is synced via $effect
				phase = 'heart-in';

				// Spawn floating heart
				const id = Date.now();
				floatingHearts = [...floatingHearts, id];
				setTimeout(() => {
					floatingHearts = floatingHearts.filter((h) => h !== id);
				}, 1000);

				setTimeout(() => {
					phase = 'idle';
					animating = false;
				}, 400);
			}, 350);
		}, 300);
	}
</script>

<article class={`support-widget ${type}`}>
	{#if type === 'full'}
		<p>If you like the app, show some love ❤️ or buy me a coffee ☕</p>
	{/if}
	<div class="actions">
		<Button className="like {phase}" onClick={addLike}>
			<span class="like-icon-wrapper">
				{#if liked}
					<span class="heart-icon" class:heart-in={phase === 'heart-in'}>
						<HeartFill />
					</span>
				{:else}
					<span class="hand-icon" class:slide-out={phase === 'slide-out'}>
						<HandHeartIconBold />
					</span>
				{/if}
				{#each floatingHearts as id (id)}
					<span class="floating-heart">
						<HeartFill />
					</span>
				{/each}
			</span>
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
			width: 320px;
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
				display: flex;
				width: 100%;
				gap: 6px;

				border: none;
				border-radius: 100vw;
				padding: 0.5rem 1rem;

				font-size: clamp(14px, 2.5cqi, 16px);
				font-weight: bold;
				line-height: 1.25;
				text-align: center;

				:global(svg) {
					flex-shrink: 0;
					width: 24px;
					height: 24px;
				}
			}

			:global(.like) {
				position: relative;
				color: #ff4848;
				background-color: white;
				transition: transform 0.15s ease;
			}

			:global(.like.pulse) {
				animation: button-pulse 0.3s ease;
			}

			:global(.buy-me-a-coffee) {
				color: #1b1b02;
				background-color: #fbff00;
				text-align: left;
			}
		}

		.like-icon-wrapper {
			position: relative;
			display: flex;
			align-items: center;
		}

		.hand-icon,
		.heart-icon {
			display: flex;
			align-items: center;
		}

		.hand-icon.slide-out {
			animation: slide-out-right 0.35s ease-in forwards;
		}

		.heart-icon.heart-in {
			animation: heart-pop-in 0.4s ease-out;
		}

		.floating-heart {
			position: absolute;
			left: 50%;
			bottom: 0;

			animation: float-up 1s ease-out forwards;

			:global(svg) {
				width: 24px;
				height: 24px;
			}
		}

		@keyframes button-pulse {
			0% {
				transform: scale(1);
			}
			50% {
				transform: scale(1.08);
			}
			100% {
				transform: scale(1);
			}
		}

		@keyframes slide-out-right {
			0% {
				transform: translateX(0);
				opacity: 1;
			}
			100% {
				transform: translateX(20px);
				opacity: 0;
			}
		}

		@keyframes heart-pop-in {
			0% {
				transform: scale(0);
				opacity: 0;
			}
			50% {
				transform: scale(1.3);
				opacity: 1;
			}
			100% {
				transform: scale(1);
				opacity: 1;
			}
		}

		@keyframes float-up {
			0% {
				opacity: 1;
				translate: -50% 0;
			}
			100% {
				opacity: 0;
				translate: -50% -40px;
			}
		}
	}
</style>
