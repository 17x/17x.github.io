import {combineReducers} from 'redux';
import filter from './filter';
import todos from './todos';

const reducers = combineReducers({
    filter, todos
});

export default reducers;