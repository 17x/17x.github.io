export const isDragging = state => ({
    type: 'SET_DRAG_STATE',
    state
});

export const addItemToViewPort = ({style, modelType, id}) => ({
    type: 'ADD_VIEW_PORT_CONTENT_ITEM',
    style,
    modelType,
    id
});

export const changeViewPortItem = items => ({
    type: 'CHANGE_VIEW_PORT_CONTENT_ITEM',
    items
});

export const deleteViewPortItem = idOrStr => ({
    type: 'DELETE_VIEW_PORT_CONTENT_ITEM',
    idOrStr
});

export const mouseInViewport = state => ({
    type: 'SET_MOUSE_IN_VIEWPORT',
    state
});

export const openEditModal = id => ({
    type: 'OPEN_EDIT_MODAL',
    id
});

export const closeEditModal = () => ({
    type: 'CLOSE_EDIT_MODAL'
});