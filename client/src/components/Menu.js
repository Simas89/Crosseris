import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { createSelector } from 'reselect';
import { ZOOM, UN_DO } from '../redux/types';
import { FloatingBtn } from '../components/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faSearchMinus,
	faSearchPlus,
	faRedo,
	faVolumeUp,
	faVolumeMute,
} from '@fortawesome/free-solid-svg-icons';

import useAudio from '../hooks/useAudio';

const menuStateselector = createSelector(
	(state) => state.field,
	(field) => {
		return {
			mode: field.mode,
			canUnDo: field.history.length > 0,
			canScaleUp: field.blockScale.canScaleUp,
			canScaleDown: field.blockScale.canScaleDown,
		};
	},
);

const Menu = () => {
	const state = useSelector(menuStateselector, shallowEqual);
	const [playing, toggle] = useAudio('audio/song.mp3');
	const dispatch = useDispatch();

	return (
		<>
			<FloatingBtn onClick={toggle} floatRight active={playing}>
				<FontAwesomeIcon
					icon={playing ? faVolumeUp : faVolumeMute}
					className='icon icon-redo'
				/>
			</FloatingBtn>

			{state.mode === 'PLAY' && (
				<FloatingBtn
					onClick={() => state.canUnDo && dispatch({ type: UN_DO })}
					bottom={130}
					active={state.canUnDo}>
					<FontAwesomeIcon icon={faRedo} className='icon icon-redo' />
				</FloatingBtn>
			)}

			{state.mode !== 'HOME' && (
				<>
					<FloatingBtn
						onClick={() =>
							state.canScaleUp && dispatch({ type: ZOOM, payload: true })
						}
						active={state.canScaleUp}
						bottom={70}>
						<FontAwesomeIcon icon={faSearchPlus} className='icon icon-zoom' />
					</FloatingBtn>

					<FloatingBtn
						onClick={() =>
							state.canScaleDown && dispatch({ type: ZOOM, payload: false })
						}
						active={state.canScaleDown}>
						<FontAwesomeIcon icon={faSearchMinus} className='icon icon-zoom' />
					</FloatingBtn>
				</>
			)}
		</>
	);
};

export default Menu;
