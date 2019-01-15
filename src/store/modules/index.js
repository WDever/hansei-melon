import { combineReducers } from "redux";
import musicList from './musicList';
import search from './search';

export default combineReducers({
  musicList,
  search
});
