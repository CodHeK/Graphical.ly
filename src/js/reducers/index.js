import { combineReducers } from 'redux';
import edges from './EdgeReducer';
import dfs from './EdgeReducer';

export default combineReducers({
  edges,
  dfs,
})
