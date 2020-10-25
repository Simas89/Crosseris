import { combineReducers } from 'redux';
import fieldReducer from './reducers/fieldReducer';
import lvlDataStoreReducer from './reducers/lvlDataStoreReducer';

export default combineReducers({
	field: fieldReducer,
	lvlData: lvlDataStoreReducer,
});
