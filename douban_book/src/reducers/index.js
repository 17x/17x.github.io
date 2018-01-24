import {combineReducers} from 'redux';
import drawer from './drawer';
import title from './title';
import authenticated from './authenticated';
import toTopBtn from './toTopBtn';

const reducers = combineReducers({drawer, title, authenticated, toTopBtn});

export default reducers;