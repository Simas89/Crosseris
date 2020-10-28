import produce from 'immer';
import {
	STORE_ORIGINAL_LEVELS,
	STORE_CUSTOM_LEVELS,
	SET_ORIGINAL_OR_CUSTOM_LVL_DATA_SOURCE,
} from 'redux/types';
import levelData from 'levelData';

const initialState = {
	custom: [],
	original: levelData,
	lvlDataSource: levelData,
	route: null,
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
			case SET_ORIGINAL_OR_CUSTOM_LVL_DATA_SOURCE:
				// console.log(action.payload);
				draft.route = action.payload;
				if (action.payload === 'ORIGINAL') {
					draft.lvlDataSource = state.original;
				}
				if (action.payload === 'CUSTOM') {
					draft.lvlDataSource = state.custom;
				}
				break;
			default:
				break;
		}
	});
