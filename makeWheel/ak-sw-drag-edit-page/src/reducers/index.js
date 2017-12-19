import {combineReducers} from 'redux';

import isDragging from './isDragging';
import inEdit from './inEdit';
import viewportList from './viewportList';
import mouseInViewport from './mouseInViewport';
import editModal from './editModal';

let reducers = combineReducers({
    isDragging,
    inEdit,
    viewportList,
    mouseInViewport,
    editModal
});

export default reducers;