import React from 'react';
import { connect, useSelector, shallowEqual } from 'react-redux';
import { createSelector } from 'reselect';
import {
	setBlockAction,
	mulstiSelectAction,
} from '../redux/actions/fieldActions';
import { BlockBase } from './common';
import Marker from './Marker';
import { useSpring, animated } from 'react-spring';

const setType = (type, mode) => {
	// console.log(type);
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
		};
	},
);

const Block = (props) => {
	const [multiSelectMode, setMultiSelectMode] = React.useState(null);
	const ref = React.useRef(null);

	const state = useSelector(blockStateSelector, shallowEqual);

	const onMouseUp = () => {
		setMultiSelectMode(null);
	};

	const onMouseDown = () => {
		props.mode === 'PLAY' &&
			setMultiSelectMode(setType(props.type, props.mode));

		props.setBlock({
			index: props.index,
			type: setType(props.type, props.mode),
			origin: 'BLOCK',
		});
	};

	const onMouseLeave = () => {
		// console.log('m-leave');
		if (multiSelectMode) {
			const dimensions = ref.current.getBoundingClientRect();
			setTimeout(() => {
				props.multiSelect({
					mode: multiSelectMode,
					index: props.index,
					x: parseInt(dimensions.x),
					y: parseInt(dimensions.y),
					width: parseInt(dimensions.width),
				});
				setMultiSelectMode(null);
			}, 0);
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
			{props.type === 'CROSS' && <Marker isWinner={props.isWinner} cross />}
		</BlockBaseAnimated>
	);
};

const mapStateToProps = (state) => {
	return { mode: state.field.mode, isWinner: state.field.isWinner };
};
const mapDispatchToProps = (dispatch) => {
	return {
		setBlock: (blockParam) => dispatch(setBlockAction(blockParam)),
		multiSelect: (data) => dispatch(mulstiSelectAction(data)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Block);
