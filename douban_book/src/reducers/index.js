import {combineReducers} from 'redux';
import drawer from './drawer';
import title from './title';
import authendicated from './authendicated';
import toTopBtn from './toTopBtn';

const reducers = combineReducers({drawer, title, authendicated, toTopBtn});

export default reducers;