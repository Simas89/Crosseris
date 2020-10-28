export const calcStacks = (mode, fieldArr) => {
	const rows = fieldArr[fieldArr.length - 1].y;
	const columns = fieldArr[fieldArr.length - 1].x;

	const yStackCurrent = [];
	const xStackCurrent = [];

	/// Y
	for (let i = 0; i < rows; i++) {
		let combos = [0];
		let piece = 0;
		let isFlowCombo = false;

		for (let j = 0; j < columns; j++) {
			if (fieldArr[i * columns + j].type === 'MARK') {
				if (combos.length <= piece) {
					combos.push(0);
				}
				combos[piece]++;
				isFlowCombo = true;
			} else {
				if (isFlowCombo) {
					piece++;
					isFlowCombo = false;
				}
			}
		}
		yStackCurrent.push(combos);
		piece = 0;
		combos = [0];
	}
	/// X

	for (let i = 0; i < columns; i++) {
		let combos = [0];
		let piece = 0;
		let isFlowCombo = false;

		for (let j = 0; j < rows * columns; j += columns) {
			if (fieldArr[j + i].type === 'MARK') {
				if (combos.length <= piece) {
					combos.push(0);
				}
				combos[piece]++;
				isFlowCombo = true;
			} else {
				if (isFlowCombo) {
					piece++;
					isFlowCombo = false;
				}
			}
		}
		xStackCurrent.push(combos);
		combos = [0];
		piece = 0;
		isFlowCombo = false;
	}
	if (mode === 'DEV') {
		const xStack = xStackCurrent;
		const yStack = yStackCurrent;
		return { xStack, yStack };
	} else {
		return { xStackCurrent, yStackCurrent };
	}
};
