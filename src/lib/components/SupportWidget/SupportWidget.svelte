<script lang="ts">
	import { browser } from '$app/environment';
	import Button from '../Button/Button.svelte';
	import HandHeartIconBold from '~icons/ph/hand-heart-bold';
	import HeartFill from '~icons/ph/heart-fill';
	import CoffeeIconBold from '~icons/ph/coffee-bold';
	import { onMount } from 'svelte';

	interface Props {
		type: 'compact' | 'full';
	}

	let { type }: Props = $props();

	const STORAGE_KEY = 'weather-plants:liked';
	const BUYMEACOFFEE_URL = 'https://www.buymeacoffee.com/colinfarkas';

	let likes = $state(0);
	let liked = $state(browser && localStorage.getItem(STORAGE_KEY) === 'true');
	let animating = $state(false);
	let phase = $state<'idle' | 'pulse' | 'slide-out' | 'heart-in'>('idle');
	let floatingHearts = $state<number[]>([]);

	onMount(async () => {
		try {
			const res = await fetch('/api/likes');
			if (res.ok) {
				const data = await res.json();
				likes = data.likes ?? 0;
			}
		} catch {
			// Silently fail — likes count is non-critical
		}
	});

	$effect(() => {
		if (browser) {
			localStorage.setItem(STORAGE_KEY, String(liked));
		}
	});

	async function postLike(): Promise<void> {
		try {
			const res = await fetch('/api/likes', { method: 'POST' });
			if (res.ok) {
				const data = await res.json();
				likes = data.likes ?? likes + 1;
			}
		} catch {
			// Optimistic update if POST fails
			likes += 1;
		}
	}

	function sleep(ms: number): Promise<void> {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	async function addLike() {
		if (liked || animating) return;
		animating = true;

		phase = 'pulse';
		await sleep(300);

		phase = 'slide-out';
		await sleep(350);

		liked = true;
		phase = 'heart-in';
		spawnFloatingHeart();
		postLike();
		await sleep(400);

		phase = 'idle';
		animating = false;
	}

	function spawnFloatingHeart() {
		const id = Date.now();
		floatingHearts = [...floatingHearts, id];
		setTimeout(() => {
			floatingHearts = floatingHearts.filter((h) => h !== id);
		}, 1000);
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
			<span class="like-count">{likes}</span>
		</Button>
		<Button
			className="buy-me-a-coffee"
			onClick={() => window.open(BUYMEACOFFEE_URL, '_blank', 'noopener,noreferrer')}
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
				gap: 4px;

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
