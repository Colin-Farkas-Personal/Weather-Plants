<script lang="ts">
	import ClockClockwiseBold from '~icons/ph/clock-clockwise-bold';
	import ClockCounterClockwiseBold from '~icons/ph/clock-counter-clockwise-bold';
	import { transitionValue } from './transition';
	import { scrollWheelController } from './scrollWheelController';
	import { windowOrientation } from '$lib/globals/windowStore';

	interface ScrollWheelProps {
		min: number;
		max: number;
		value: number;
		step?: number;
		onValueChange: (value: number) => void;
		onValueCommit: (value: number) => void;
	}

	let {
		min,
		max,
		step = 1,
		value = $bindable(),
		onValueChange: onChange,
		onValueCommit,
	}: ScrollWheelProps = $props();

	let orientation = windowOrientation;

	// State
	let knurlingRef!: HTMLDivElement;
	const lines = new Array(92);
	const canDecrement = $derived(value > min);
	const canIncrement = $derived(value < max);
	let isInteracting = $state(false);
	let isActiveScrolling = $state(false);
	let timeoutRef = $state<ReturnType<typeof setTimeout> | null>(null);
	let scrollEndTimeoutRef = $state<ReturnType<typeof setTimeout> | null>(null);
	let isPointerDown = $state(false);
	let pointerStartX = $state(0);
	let pointerStartScrollLeft = $state(0);
	let activePointerId = $state<number | null>(null);

	const { decrement, increment, stepTo, cancelSnap } = scrollWheelController({
		min,
		max,
		step,
		getValue,
		getVisualValue,
		setVisualValue,
		onChange,
		requestCommit,
		setInteracting,
		startTransition: transitionValue,
	});

	function setInteracting(interacting: boolean) {
		isInteracting = interacting;
	}

	function getValue(): number {
		return value;
	}

	function getVisualValue(): number {
		if (!knurlingRef) {
			return value;
		}

		const maxScroll = knurlingRef.scrollWidth - knurlingRef.clientWidth;
		if (maxScroll <= 0) {
			return value;
		}

		const progress = knurlingRef.scrollLeft / maxScroll;
		const visualValueFixed = Number((min + progress * (max - min)).toFixed(3));
		return visualValueFixed;
	}

	function setVisualValue(newValue: number) {
		if (!knurlingRef) return;

		const maxScroll = knurlingRef.scrollWidth - knurlingRef.clientWidth;
		if (maxScroll <= 0) return;

		const progress = (newValue - min) / (max - min);
		const clampedProgress = Math.max(0, Math.min(progress, 1));
		const left = Math.round(clampedProgress * maxScroll);

		if (Math.abs(knurlingRef.scrollLeft - left) < 1) return;

		knurlingRef.scrollLeft = left;
	}

	const COMMIT_ON_DELAY_MS = 500;
	function requestCommit(value: number) {
		// Cancel existing timeout;
		if (timeoutRef) {
			clearTimeout(timeoutRef);
		}

		timeoutRef = setTimeout(() => {
			onValueCommit(value);
		}, COMMIT_ON_DELAY_MS);
	}

	function handleWheel() {
		// User intends to take over (trackpad / wheel)
		isActiveScrolling = true;
		cancelSnap();

		// Re-arm the scroll-end debounce. At scroll boundaries the scroll
		// position can't change so handleScroll won't fire, but we still
		// need handleScrollEnd to trigger once wheel events stop.
		if (scrollEndTimeoutRef) {
			clearTimeout(scrollEndTimeoutRef);
		}
		scrollEndTimeoutRef = setTimeout(() => {
			handleScrollEnd();
		}, 140);
	}

	function handleScroll() {
		if (!knurlingRef) return;

		// Ignore programmatic scroll unless the user has taken control.
		if (!isActiveScrolling) {
			// If the user is still holding a pointer/touch, re-enable.
			// This recovers from a premature handleScrollEnd during slow drags.
			if (isPointerDown) {
				isActiveScrolling = true;
				cancelSnap();
			} else {
				return;
			}
		}

		onChange(getVisualValue());

		// Debounce scroll end (works across browsers and for grab-drag)
		if (scrollEndTimeoutRef) clearTimeout(scrollEndTimeoutRef);
		scrollEndTimeoutRef = setTimeout(() => {
			handleScrollEnd();
		}, 140);
	}

	function handleScrollEnd() {
		if (scrollEndTimeoutRef) {
			clearTimeout(scrollEndTimeoutRef);
			scrollEndTimeoutRef = null;
		}

		// Don't snap while the user is still holding the pointer down.
		if (!isActiveScrolling || isPointerDown) return;

		isActiveScrolling = false;
		stepTo(getVisualValue());
	}

	$effect(() => {
		// Only sync when not actively scrolling or animating
		if (!isActiveScrolling && !isInteracting) {
			syncKnurlingWithValue(value);
		}
	});

	function syncKnurlingWithValue(newValue: number) {
		if (!knurlingRef) return;

		const knurlingLeftPx = knurlingRef.scrollLeft;
		const knurlingMaxPx = knurlingRef.scrollWidth - knurlingRef.clientWidth;
		const currentPosPercent = knurlingLeftPx / knurlingMaxPx;

		const currentValueFromKnurlingPos = min + currentPosPercent * (max - min);

		const valueDiff = Math.abs(newValue - currentValueFromKnurlingPos);
		if (valueDiff > step) {
			transitionValue(currentValueFromKnurlingPos, newValue, (transitionValue) => {
				setVisualValue(transitionValue);
			});
		} else {
			// Too small - just sync visual directly
			setVisualValue(newValue);
		}
	}

	function handlePointerDown(e: PointerEvent) {
		isActiveScrolling = true;
		cancelSnap();

		// Track pointer-down for all input types so the scroll-end
		// debounce won't prematurely snap during slow drags.
		isPointerDown = true;
		activePointerId = e.pointerId;

		// Only enable manual grab-scroll for mouse; touch relies on
		// native scroll via touch-action: pan-x.
		if (e.pointerType === 'mouse' && knurlingRef) {
			pointerStartX = e.clientX;
			pointerStartScrollLeft = knurlingRef.scrollLeft;
			knurlingRef.setPointerCapture(e.pointerId);
		}
	}

	function handlePointerMove(e: PointerEvent) {
		if (!knurlingRef) return;
		if (!isPointerDown) return;
		if (activePointerId !== e.pointerId) return;
		if (e.pointerType !== 'mouse') return;

		// 1:1 pixel drag: move scrollLeft by the same amount the mouse moved.
		const dx = e.clientX - pointerStartX;
		knurlingRef.scrollLeft = pointerStartScrollLeft - dx;
	}

	function handlePointerUp(e: PointerEvent) {
		if (!isPointerDown) return;
		if (activePointerId !== e.pointerId) return;

		isPointerDown = false;
		activePointerId = null;

		if (e.pointerType === 'mouse' && knurlingRef) {
			try {
				knurlingRef.releasePointerCapture(e.pointerId);
			} catch {
				// ignore if capture is already released
			}
		}

		handleScrollEnd();
	}

	function handlePointerCancel(e: PointerEvent) {
		if (activePointerId !== e.pointerId) return;

		if (e.pointerType === 'mouse') {
			// For mouse, treat cancel the same as pointer-up.
			isPointerDown = false;
			activePointerId = null;
			if (knurlingRef) {
				try {
					knurlingRef.releasePointerCapture(e.pointerId);
				} catch {
					// ignore
				}
			}
			handleScrollEnd();
		}
		// For touch: the browser is taking over native scrolling after
		// pointercancel. Keep isPointerDown true so the scroll-end debounce
		// won't commit prematurely. touchend will handle final cleanup.
	}

	function handleTouchEnd() {
		if (!isPointerDown) return;
		isPointerDown = false;
		activePointerId = null;
		handleScrollEnd();
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'ArrowLeft') {
			e.preventDefault();
			decrement();
		} else if (e.key === 'ArrowRight') {
			e.preventDefault();
			increment();
		}
	}
</script>

<div id="scroll-wheel" class="scroll-wheel {$orientation}">
	<button
		type="button"
		aria-label="backwards"
		class="backwards"
		class:disable-stepping={!canDecrement}
		onclick={decrement}
	>
		<ClockCounterClockwiseBold />
	</button>
	<div class="knurling-container">
		<div
			role="slider"
			aria-valuemin={min}
			aria-valuemax={max}
			aria-valuenow={value}
			tabindex="0"
			class="knurling"
			bind:this={knurlingRef}
			onwheel={handleWheel}
			onscroll={handleScroll}
			onpointerdown={handlePointerDown}
			onpointermove={handlePointerMove}
			onpointerup={handlePointerUp}
			onpointercancel={handlePointerCancel}
			ontouchend={handleTouchEnd}
			ontouchcancel={handleTouchEnd}
			onkeydown={handleKeyDown}
		>
			{#each lines, index (index)}
				<span id={String(index)} class="line"></span>
			{/each}
		</div>
	</div>
	<button
		type="button"
		aria-label="forwards"
		class="forwards"
		class:disable-stepping={!canIncrement}
		onclick={increment}
	>
		<ClockClockwiseBold />
	</button>
</div>

<style lang="scss">
	.scroll-wheel {
		display: flex;
		align-items: center;
		justify-self: center;

		background-color: black;

		&.portrait {
			width: 100%;
			max-width: 480px;
			height: 48px;
			gap: 6px;
			align-items: stretch;
			background-color: transparent;

			button {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;

				padding: 12px;
				margin: 0;
				border: none;
				background: none;

				color: rgb(99, 99, 99);
				background-color: #1b1b1b;

				&:active {
					background-color: rgb(17, 17, 17);
				}

				&:focus-visible {
					outline: 2px solid -webkit-focus-ring-color;
					outline-offset: 2px;
				}

				cursor: pointer;

				&.backwards {
					border-radius: 8px 8px 8px 20px;
				}

				&.forwards {
					border-radius: 8px 8px 20px 8px;
				}

				:global(svg) {
					width: 24px;
					height: 24px;
				}

				&.disable-stepping {
					color: rgb(42, 42, 42);
				}
			}

			.knurling-container {
				flex: 4 0 0;
				align-self: stretch;
				min-width: 0;

				border-radius: 8px;
				overflow: hidden;

				&:focus-within {
					outline: 2px solid -webkit-focus-ring-color;
					outline-offset: 2px;
				}
			}

			.knurling {
				display: flex;
				align-items: flex-end;
				gap: 10px;

				width: 100%;
				height: 100%;
				padding: 12px;

				outline: none;

				overflow-x: scroll;
				overflow-y: hidden;
				scrollbar-width: none;
				cursor: grab;
				user-select: none;
				-webkit-overflow-scrolling: touch;
				touch-action: pan-x;

				-webkit-mask-image: linear-gradient(
					to right,
					transparent 0%,
					black 30%,
					black 70%,
					transparent 100%
				);
				mask-image: linear-gradient(
					to right,
					transparent 0%,
					black 30%,
					black 70%,
					transparent 100%
				);
				-webkit-mask-repeat: no-repeat;
				mask-repeat: no-repeat;
				-webkit-mask-size: 100% 100%;
				mask-size: 100% 100%;

				.line {
					width: 3.5px;
					height: 70%;
					border-radius: 12px;
					background-color: rgb(75, 75, 75);
					flex: 0 0 auto;
					pointer-events: none;
				}

				.line:nth-child(3n) {
					height: 100%;
				}
			}
		}

		&.landscape {
			width: 100%;
			max-width: 420px;
			height: 64px;
			gap: 6px;
			padding: 8px;
			border-radius: 60px;
			align-items: stretch;

			button {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;

				padding: 0 14px;
				margin: 0;
				border: none;
				background: none;

				color: #777d82;
				background-color: #1b1b1b;

				&:active {
					background-color: rgb(17, 17, 17);
				}

				&:focus-visible {
					outline: 2px solid -webkit-focus-ring-color;
					outline-offset: -2px;
				}

				cursor: pointer;

				&.backwards {
					border-radius: 50px 16px 16px 50px;
				}

				&.forwards {
					border-radius: 16px 50px 50px 16px;
				}

				:global(svg) {
					width: 24px;
					height: 24px;
				}

				&.disable-stepping {
					color: rgb(45, 45, 45);
				}
			}

			.knurling-container {
				flex: 4 0 0;
				align-self: stretch;
				min-width: 0;

				border-radius: 8px;
				overflow: hidden;

				&:focus-within {
					outline: 2px solid -webkit-focus-ring-color;
					outline-offset: -2px;
				}
			}

			.knurling {
				display: flex;
				align-items: flex-end;
				gap: 10px;

				height: 100%;
				padding: 12px;

				outline: none;

				overflow-x: scroll;
				overflow-y: hidden;
				scrollbar-width: none;
				cursor: grab;
				user-select: none;
				-webkit-overflow-scrolling: touch;
				touch-action: pan-x;

				-webkit-mask-image: linear-gradient(
					to right,
					transparent 0%,
					black 30%,
					black 70%,
					transparent 100%
				);
				mask-image: linear-gradient(
					to right,
					transparent 0%,
					black 30%,
					black 70%,
					transparent 100%
				);
				-webkit-mask-repeat: no-repeat;
				mask-repeat: no-repeat;
				-webkit-mask-size: 100% 100%;
				mask-size: 100% 100%;

				.line {
					width: 3.5px;
					height: 70%;
					border-radius: 12px;
					background-color: rgb(75, 75, 75);
					flex: 0 0 auto;
					pointer-events: none;
				}

				.line:nth-child(3n) {
					height: 100%;
				}
			}
		}
	}
</style>
