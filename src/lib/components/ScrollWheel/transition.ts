import { backOut } from 'svelte/easing';

interface TransitionOptions {
	duration?: number;
	easingFunction?: (t: number) => number;
}

const TRANSITION_DURATION_MS = 250;
function transitionValue(
	from: number,
	to: number,
	frameFunction: (value: number) => void,
	onCompletedFunction?: (targetValue: number) => void,
	options: TransitionOptions = {},
) {
	let localRafId = 0;
	const start = performance.now();
	const delta = to - from;
	let cancelled = false;

	const { duration = TRANSITION_DURATION_MS, easingFunction = backOut } = options;

	const frame = (now: number) => {
		if (cancelled) return;
		const t = Math.min(1, (now - start) / duration);
		const v = from + delta * easingFunction(t);
		const toFixed = Number(v.toFixed(3));
		frameFunction(toFixed);

		if (t < 1) {
			localRafId = requestAnimationFrame(frame);
		} else {
			// ensure exact final value
			frameFunction(toFixed);
			onCompletedFunction?.(toFixed);
		}
	};

	localRafId = requestAnimationFrame(frame);

	return () => {
		cancelled = true;
		cancelAnimationFrame(localRafId);
	};
}

export { transitionValue };
