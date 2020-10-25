import produce from 'immer';
import {
	STORE_ORIGINAL_LEVELS,
	STORE_CUSTOM_LEVELS,
	SET_ORIGINAL_OR_CUSTOM_LVL_DATA_API,
} from '../types';
import levelData from '../../levelData';

const initialState = {
	custom: [],
	original: levelData,
	channel: levelData,
	api: 'ORIGINAL',
};

export default (state = initialState, action = {}) =>
	produce(state, (draft) => {
		switch (action.type) {
			case STORE_CUSTOM_LEVELS:
				draft.custom = action.payload;
				break;

			case STORE_ORIGINAL_LEVELS:
				draft.original = action.payload;

				break;
			case SET_ORIGINAL_OR_CUSTOM_LVL_DATA_API:
				console.log(action.payload);
				draft.api = action.payload;
				if (action.payload === 'ORIGINAL') {
					draft.channel = state.original;
				}
				if (action.payload === 'CUSTOM') {
					draft.channel = state.custom;
				}
				break;
			default:
				break;
		}
	});
