import React from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { MULTI_SELECT_TRIG, SET_BLOCK } from 'redux/types';
import { createSelector } from 'reselect';
import { BlockBase } from 'common/components';
import Marker from './Marker';
import { useSpring, animated } from 'react-spring';

const setType = (type, mode) => {
	if (type === 'MARK') return mode === 'PLAY' ? 'CROSS' : 'NULL';
	if (type === 'MARK') return 'CROSS';
	else if (type === 'NULL') return 'MARK';
	else return 'NULL';
};

const BlockBaseAnimated = animated(BlockBase);

const blockStateSelector = createSelector(
	(state) => state.field,
	(field) => {
		return {
			isFieldActive: field.isFieldActive,
			mode: field.mode,
			isWinner: field.isWinner,
		};
	},
);

const Block = React.memo((props) => {
	// console.log('block');
	const [multiSelectMode, setMultiSelectMode] = React.useState(null);
	const ref = React.useRef(null);
	const dispatch = useDispatch();

	const state = useSelector(blockStateSelector, shallowEqual);

	const onMouseUp = () => {
		setMultiSelectMode(null);
	};

	const onMouseDown = () => {
		state.mode === 'PLAY' &&
			setMultiSelectMode(setType(props.type, state.mode));

		dispatch({
			type: SET_BLOCK,
			payload: {
				index: props.index,
				type: setType(props.type, state.mode),
				origin: 'BLOCK',
			},
		});
	};

	const onMouseLeave = () => {
		if (multiSelectMode) {
			const dimensions = ref.current.getBoundingClientRect();

			dispatch({
				type: MULTI_SELECT_TRIG,
				payload: {
					mode: multiSelectMode,
					index: props.index,
					x: parseInt(dimensions.x),
					y: parseInt(dimensions.y),
					width: parseInt(dimensions.width),
				},
			});
			setMultiSelectMode(null);
		}
	};

	const animate = useSpring({
		to: {
			backgroundColor:
				props.type === 'MARK' ? 'rgba(30, 30, 30, 0.9)' : 'rgba(30, 30, 30, 0)',
		},
	});

	return (
		<BlockBaseAnimated
			style={animate}
			ref={ref}
			onMouseDown={state.isFieldActive && !props.isTouch ? onMouseDown : null}
			onMouseUp={state.isFieldActive && !props.isTouch ? onMouseUp : null}
			onMouseLeave={state.isFieldActive && !props.isTouch ? onMouseLeave : null}
			onTouchStart={state.isFieldActive && props.isTouch ? onMouseDown : null}
			onTouchEnd={state.isFieldActive && props.isTouch ? onMouseUp : null}
			onTouchMove={state.isFieldActive && props.isTouch ? onMouseLeave : null}
			type={props.type}
			isFieldActive={state.isFieldActive}>
			{props.type === 'CROSS' && <Marker isWinner={state.isWinner} cross />}
		</BlockBaseAnimated>
	);
});

export default Block;
