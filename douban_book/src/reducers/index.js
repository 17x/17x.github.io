import {combineReducers} from 'redux';
import drawer from './drawer';
import title from './title';
import authendicated from './authendicated';

const reducers = combineReducers({drawer, title, authendicated});

export default reducers;