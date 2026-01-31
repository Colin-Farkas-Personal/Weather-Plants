interface ScrollWheelControllerContext {
	min: number;
	max: number;
	step: number;
	getValue: () => number;
	getVisualValue: () => number;
	setVisualValue: (value: number) => void;
	onChange: (value: number) => void;
	requestCommit: (value: number) => void;
	setInteracting: (interacting: boolean) => void;
	startTransition: (
		from: number,
		to: number,
		onFrame: (value: number) => void,
		onDone: (value: number) => void,
	) => () => void;
}
function scrollWheelController({
	min,
	max,
	step,
	getValue,
	getVisualValue,
	setVisualValue,
	onChange,
	requestCommit,
	setInteracting,
	startTransition,
}: ScrollWheelControllerContext) {
	let cancelActiveTransition: (() => void) | null = null;
	let activeTransitionId = 0;

	// Helpers: clamp and rounding-to-step with controlled precision
	function clamp(value: number, lowest: number, highest: number) {
		return Math.max(lowest, Math.min(value, highest));
	}

	function roundToStep(value: number) {
		const s = step ?? 1;
		// compute decimal precision from step (e.g. 0.01 -> 2 decimals)
		const stepStr = String(s);
		const decimals = stepStr.includes('.') ? stepStr.split('.')[1].length : 0;
		const n = Math.round(value / s) * s;
		// normalize floating point noise to the step's precision
		return Number(n.toFixed(decimals));
	}

	function stepTo(target: number) {
		const valueNow = getValue();

		// Clamp the target inside bounds first, then snap to step precision.
		const clamped = clamp(target, min, max);
		const nextValueRounded = roundToStep(clamped);

		// If the computed target equals the current logical value, nothing to do.
		if (nextValueRounded === valueNow) return;

		setInteracting(true);

		// Start animation from the current *visual* position to the computed target.
		cancelActiveTransition?.();
		const transitionId = ++activeTransitionId;
		const from = getVisualValue();

		cancelActiveTransition = startTransition(
			from,
			nextValueRounded,
			(transitionValue) => {
				setVisualValue(transitionValue);
				onChange(transitionValue);
			},
			() => {
				if (transitionId === activeTransitionId) {
					setInteracting(false);
					cancelActiveTransition = null;
					requestCommit(nextValueRounded);
				}
			},
		);
	}

	function syncVisual() {
		// Sync the scroll position to the current logical value
		const valueNow = getValue();
	}

	return {
		increment: () => stepTo(getValue() + step),
		decrement: () => stepTo(getValue() - step),
		stepTo,
	};
}

export { scrollWheelController };
