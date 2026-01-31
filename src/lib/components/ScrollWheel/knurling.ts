import { transitionValue } from './transition';

export function handleKnurling(
	knurlingRef: HTMLElement,
	min: number,
	max: number,
	isInteracting: () => boolean,
) {
	function turnKnurling(newValue: number) {
		if (!knurlingRef) return;

		const maxScroll = knurlingRef.scrollWidth - knurlingRef.clientWidth;
		if (maxScroll <= 0) return;

		const progress = (newValue - min) / (max - min);
		const clampedProgress = Math.max(0, Math.min(progress, 1));
		const left = Math.round(clampedProgress * maxScroll);

		if (Math.abs(knurlingRef.scrollLeft - left) < 1) return;

		knurlingRef.scrollLeft = left;
	}

	function syncKnurlingWithValue(newValue: number) {
		// Calculate current value from knurling position
		// Current 1000px out of 1370px

		if (!knurlingRef || isInteracting()) {
			return;
		}

		const knurlingLeftPx = knurlingRef.scrollLeft;
		const knurlingMaxPx = knurlingRef.scrollWidth - knurlingRef.clientWidth;
		const currentPosPercent = knurlingLeftPx / knurlingMaxPx;

		const currentValueFromKnurlingPos = min + currentPosPercent * (max - min);

		transitionValue(currentValueFromKnurlingPos, newValue, (transitionValue) => {
			turnKnurling(transitionValue);
		});
	}

	return {
		turnKnurling,
		syncKnurlingWithValue,
	};
}
