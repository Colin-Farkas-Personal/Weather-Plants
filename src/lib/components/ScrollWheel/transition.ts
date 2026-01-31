import { backOut } from 'svelte/easing';

const TRANSITION_DURATION_MS = 250;
function transitionValue(
	from: number,
	to: number,
	frameFunction: (value: number) => void,
	onCompletedFunction?: (targetValue: number) => void,
) {
	let localRafId = 0;
	const start = performance.now();
	const delta = to - from;
	let cancelled = false;

	const frame = (now: number) => {
		if (cancelled) return;
		const t = Math.min(1, (now - start) / TRANSITION_DURATION_MS);
		const v = from + delta * backOut(t);
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
