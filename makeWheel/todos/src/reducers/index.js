import {combineReducers} from 'redux';
import {counter} from './counter';
import {altMsg} from './alertMsg';

const countApp = combineReducers({
    counter,
    altMsg
});

export default countApp;