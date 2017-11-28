import {combineReducers} from 'redux';
import drawer from './drawer';
import title from './title';

const reducers = combineReducers({drawer, title});

export default reducers;