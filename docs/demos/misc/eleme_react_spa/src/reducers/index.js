import {combineReducers} from 'redux';
import ShowNavHead from './ShowNavHead';
import ShowNavFooter from './ShowNavFooter';
import Authentication from './Authentication';

export default combineReducers({
    ShowNavHead,
    ShowNavFooter,
    Authentication
});

