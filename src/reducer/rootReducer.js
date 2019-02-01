import { combineReducers } from 'redux';
import searchReducer from './search-reducer';
import userReducer from './user-reducer';

export default combineReducers({
  searchReducer,
  userReducer
});
