import {combineReducers} from 'redux';

import isDragging from './isDragging';
import inEdit from './inEdit';
import viewportList from './viewportList';
import mouseInViewport from './mouseInViewport';
import editModal from './editModal';
import footList from './footList';
import axisList from './axisList';
import progressLine from './progressLine';
import companyList from './companyList';

let reducers = combineReducers({
    isDragging,
    inEdit,
    viewportList,
    mouseInViewport,
    editModal,
    footList,
    axisList,
    progressLine,
    companyList
});

export default reducers;