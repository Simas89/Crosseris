import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { STOP_MULTI_SELECT, MULTI_SELECT_APPLY } from '../redux/types';
import useMousePosition from '../hooks/useMousePosition';
import { calcMultiSelectedBlocks, isObjEmpty, isTouch } from '../utils';

let selectedBlocks = 0;
let selectedBlocksPrev = 0;
const MultiSelector = () => {
	const [dir, setDir] = React.useState({ dir: '', lock: false });
	const multiSelect = useSelector((state) => state.field.multiSelect);
	const { x, y } = useMousePosition(isTouch);
	const dispatch = useDispatch();

	const stopMultiSelectExec = React.useCallback(() => {
		// stopMultiSelect();
		dispatch({ type: STOP_MULTI_SELECT });
		setDir({ dir: '', lock: false });
	}, [dispatch]);

	React.useEffect(() => {
		window.addEventListener(
			isTouch ? 'touchend' : 'mouseup',
			stopMultiSelectExec,
		);
		return () =>
			window.removeEventListener(
				isTouch ? 'touchend' : 'mouseup',
				stopMultiSelectExec,
			);
	}, [stopMultiSelectExec]);

	React.useEffect(() => {
		if (!isObjEmpty(multiSelect)) {
			if (x < multiSelect.x || x > multiSelect.x + multiSelect.width - 1) {
				!dir.lock && setDir({ dir: 'row', lock: true });
			}

			if (y < multiSelect.y || y > multiSelect.y + multiSelect.width - 1) {
				!dir.lock && setDir({ dir: 'col', lock: true });
			}
		} else {
			setDir({ dir: '', lock: false });
		}
	}, [multiSelect, x, y, dir.lock]);

	if (!isObjEmpty(multiSelect) && dir.dir !== '') {
		selectedBlocks = calcMultiSelectedBlocks(x, y, multiSelect, dir.dir)
			.selectedBlocks;

		if (selectedBlocks !== selectedBlocksPrev && dir.dir !== '') {
			// state update stack trace warning -- setTimeout temp fix
			setTimeout(
				() =>
					dispatch({
						type: MULTI_SELECT_APPLY,
						payload: calcMultiSelectedBlocks(x, y, multiSelect, dir.dir),
					}),

				0,
			);
			selectedBlocksPrev = selectedBlocks;
		}
	}

	return null;
};

export default MultiSelector;
