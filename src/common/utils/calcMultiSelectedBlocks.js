export const calcMultiSelectedBlocks = (x, y, multiSelect, dir) => {
	let selectedBlocks = 0;
	let currentPos = 0;
	let positiveDir = true;

	// console.log(x, y, multiSelect, dir);

	if (dir === 'row') {
		currentPos = x - multiSelect.x;
	} else if (dir === 'col') {
		currentPos = y - multiSelect.y;
	}

	if (currentPos >= 0 && currentPos <= multiSelect.width) {
		currentPos = 0;
	}

	if (currentPos > multiSelect.width) {
		currentPos = currentPos - multiSelect.width;
	}

	if (currentPos < 0) {
		positiveDir = false;
	}

	currentPos = Math.abs(currentPos);

	if (currentPos > 0) {
		selectedBlocks = 1;
	}

	let counter = 0;
	for (let i = 0; i < currentPos; i++) {
		counter++;
		if (counter === multiSelect.width) {
			selectedBlocks++;
			counter = 0;
		}
	}

	if (!positiveDir) {
		selectedBlocks = -Math.abs(selectedBlocks);
	}

	return { dir, selectedBlocks };
};
