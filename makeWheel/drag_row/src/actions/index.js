// 是否正在拖动元素到viewport
export const isDragging = state => ({
    type: 'SET_DRAG_STATE',
    state
});

// 鼠标在viewport内
export const mouseInViewport = state => ({
    type: 'SET_MOUSE_IN_VIEWPORT',
    state
});

// 添加新的viewport item
export const addItemToViewPort = item => ({
    type: 'ADD_VIEW_PORT_CONTENT_ITEM',
    item
});

// 覆盖viewport list
export const replaceViewPortItem = items => ({
    type: 'REPLACE_VIEW_PORT_CONTENT_ITEM',
    items
});

// 修改 viewport item
export const modifyViewPortItem = item => ({
    type: 'MODIFY_VIEW_PORT_CONTENT_ITEM',
    item
    /*id,
    style,
    url*/
});

// 删除viewport list
export const deleteViewPortItem = idOrStr => ({
    type: 'DELETE_VIEW_PORT_CONTENT_ITEM',
    idOrStr
});

// 清空
export const clearViewPortItem = () => ({
    type: 'CLEAR_VIEW_PORT_CONTENT_ITEM'
});

// 打开编辑模态框
export const openEditModal = (manipulation, from, id, subId) => ({
    type: 'OPEN_EDIT_MODAL',
    manipulation, // add , edit
    from, // content , foot , foot-sub
    id, // this id or parentId
    subId // current item id
});

// 关闭编辑模态框
export const closeEditModal = () => ({
    type: 'CLOSE_EDIT_MODAL'
});

// 显示处理进度条
export const showProgressLine = () => ({
    type: 'SHOW_PROGRESS_LINE'
});

// 隐藏处理进度条
export const hideProgressLine = () => ({
    type: 'HIDE_PROGRESS_LINE'
});
