<script lang="ts">
	import ClockClockwiseBold from '~icons/ph/clock-clockwise-bold';
	import ClockCounterClockwiseBold from '~icons/ph/clock-counter-clockwise-bold';
	import { transitionValue } from './transition';
	import { scrollWheelController } from './scrollWheelController';

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
	}

	function handleScroll() {
		if (!knurlingRef) return;

		// Ignore programmatic scroll unless the user has taken control.
		if (!isActiveScrolling) return;

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
		// Only enable grab-scroll for mouse to avoid touch conflicts.
		if (e.pointerType !== 'mouse') return;
		if (!knurlingRef) return;

		isActiveScrolling = true;
		isPointerDown = true;
		activePointerId = e.pointerId;

		// Cancel any active snap transition
		cancelSnap();

		pointerStartX = e.clientX;
		pointerStartScrollLeft = knurlingRef.scrollLeft;

		// Ensure we keep receiving move/up even if the pointer leaves the element.
		knurlingRef.setPointerCapture(e.pointerId);
	}

	function handlePointerMove(e: PointerEvent) {
		if (!knurlingRef) return;
		if (!isPointerDown) return;
		if (activePointerId !== e.pointerId) return;

		// 1:1 pixel drag: move scrollLeft by the same amount the mouse moved.
		const dx = e.clientX - pointerStartX;
		knurlingRef.scrollLeft = pointerStartScrollLeft - dx;
	}

	function handlePointerUp(e: PointerEvent) {
		if (!knurlingRef) return;
		if (!isPointerDown) return;
		if (activePointerId !== e.pointerId) return;

		isPointerDown = false;
		activePointerId = null;

		try {
			knurlingRef.releasePointerCapture(e.pointerId);
		} catch {
			// ignore if capture is already released
		}

		// If there is no momentum, end immediately and snap.
		handleScrollEnd();
	}
</script>

<div class="scroll-wheel">
	<button
		type="button"
		aria-label="backwards"
		class:disable-stepping={!canDecrement}
		onclick={decrement}
	>
		<ClockCounterClockwiseBold />
	</button>
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
		onpointercancel={handlePointerUp}
	>
		{#each lines as _, index (index)}
			<span id={String(index)} class="line"></span>
		{/each}
	</div>
	<button
		type="button"
		aria-label="forwards"
		class:disable-stepping={!canIncrement}
		onclick={increment}
	>
		<ClockClockwiseBold />
	</button>
</div>

<style lang="scss">
	.scroll-wheel {
		display: flex;
		gap: 12px;

		padding: 12px 18px;
		background-color: black;
		border-radius: 60px;

		button {
			padding: 0;
			margin: 0;
			border: none;
			background: none;

			color: rgb(99, 99, 99);

			cursor: pointer;

			:global(svg) {
				width: 24px;
				height: 24px;
			}

			&.disable-stepping {
				color: rgb(45, 45, 45);
			}
		}

		.knurling {
			position: relative;
			display: flex;
			align-items: flex-end; // not "end"
			gap: 10px;

			width: 240px;
			height: 32px;

			overflow-x: scroll;
			overflow-y: hidden;
			scrollbar-width: none;
			cursor: grab;
			user-select: none;
			-webkit-overflow-scrolling: touch;
			touch-action: pan-x;

			// Fade the edges without an overlay element (won't move when scrolling)
			-webkit-mask-image: linear-gradient(
				to right,
				transparent 0%,
				black 50%,
				transparent 100%
			);
			mask-image: linear-gradient(from left, black, transparent);
			-webkit-mask-repeat: no-repeat;
			mask-repeat: no-repeat;
			-webkit-mask-size: 100% 100%;
			mask-size: 100% 100%;

			.line {
				width: 5px;
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
</style>
