import {combineReducers} from 'redux';

import isDragging from './isDragging';
import inEdit from './inEdit';
import viewportList from './viewportList';
import mouseInViewport from './mouseInViewport';
import editModal from './editModal';
import progressLine from './progressLine';

let reducers = combineReducers({
    isDragging,
    inEdit,
    viewportList,
    mouseInViewport,
    editModal,
    progressLine
});

export default reducers;