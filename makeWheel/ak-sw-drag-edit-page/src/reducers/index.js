import {combineReducers} from 'redux';

import isDragging from './isDragging';
import inEdit from './inEdit';
import viewportList from './viewportList';
import mouseInViewport from './mouseInViewport';
import editModal from './editModal';
import footList from './footList';

let reducers = combineReducers({
    isDragging,
    inEdit,
    viewportList,
    mouseInViewport,
    editModal,
    footList
});

export default reducers;