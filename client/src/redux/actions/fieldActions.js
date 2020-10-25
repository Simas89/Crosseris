import {
	SET_FIELD,
	SET_BLOCK,
	SET_PLAY_STACK,
	SET_BLOCK_SIZE,
	STOP_MULTI_SELECT,
	MULTI_SELECT_TRIG,
	MULTI_SELECT_APPLY,
} from '../types';

export const generateFieldAction = (fieldSize) => {
	return {
		type: SET_FIELD,
		payload: fieldSize,
	};
};

export const setPlayStackAction = (level) => {
	return {
		type: SET_PLAY_STACK,
		payload: level,
	};
};

export const setBlockSizeAction = (dimensions) => {
	return {
		type: SET_BLOCK_SIZE,
		payload: dimensions,
	};
};

export const stopMultiSelectAction = (data) => {
	return {
		type: STOP_MULTI_SELECT,
	};
};

export const mulstiSelectAction = (data) => {
	return {
		type: MULTI_SELECT_TRIG,
		payload: data,
	};
};

export const preApplyMultiSelectAction = (data) => (dispatch) => {
	dispatch({
		type: MULTI_SELECT_APPLY,
		payload: data,
	});
};

export const setBlockAction = (blockIndex) => (dispatch) => {
	dispatch({
		type: SET_BLOCK,
		payload: blockIndex,
	});
};
