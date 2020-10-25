import { getLongestSubArrLength } from './';

export const calcBlockSize = (
	{ xStack, yStack },
	windowData,
	newBlockScale,
) => {
	let blocksTotalSpan = xStack.length + getLongestSubArrLength(yStack);
	let px = Math.floor((windowData.width - 90) / blocksTotalSpan);
	let canScaleUp = false;
	let canScaleDown = false;

	newBlockScale < 20 && (newBlockScale = 20);
	newBlockScale > 100 && (newBlockScale = 100);

	if (px >= newBlockScale) {
		px = newBlockScale;
		canScaleUp = true;
	}

	if (px >= 100) {
		canScaleUp = false;
	}
	if (px > 20) {
		canScaleDown = true;
	}

	return { blockPx: px, canScaleUp, canScaleDown };
};
