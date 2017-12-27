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
export const addItemToViewPort = ({style, modelType}) => ({
    type: 'ADD_VIEW_PORT_CONTENT_ITEM',
    style,
    modelType
});

// 覆盖viewport list
export const replaceViewPortItem = items => ({
    type: 'REPLACE_VIEW_PORT_CONTENT_ITEM',
    items
});

// 修改 viewport item
export const modifyViewPortItem = ({id, style}) => ({
    type: 'MODIFY_VIEW_PORT_CONTENT_ITEM',
    id,
    style
});

// 删除viewport list
export const deleteViewPortItem = idOrStr => ({
    type: 'DELETE_VIEW_PORT_CONTENT_ITEM',
    idOrStr
});

// 清空 foot list
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

// 添加 foot item
export const addItemToFooter = (isSub, props) => ({
    type: 'ADD_FOOT_ITEM',
    isSub,
    props
});

// 覆盖 foot list
export const replaceFooterItem = items => ({
    type: 'REPLACE_FOOT_ITEM',
    items
});

// 修改 foot item : id, modelType, text, sort, url, sub
export const modifyViewFooter = (isSub, props) => ({
    type: 'MODIFY_FOOT_ITEM',
    isSub,
    props
});

// 清空 foot list
export const deleteFooterItem = (isSub, footId, subId) => ({
    type: 'DELETE_FOOT_ITEM',
    isSub,
    footId,
    subId
});

// 清空 foot list
export const clearFooterItem = () => ({
    type: 'CLEAR_FOOT_ITEM'
});
// 显示处理进度条
export const showProgressLine = () => ({
    type: 'SHOW_PROGRESS_LINE'
});

// 隐藏处理进度条
export const hideProgressLine = () => ({
    type: 'HIDE_PROGRESS_LINE'
});

//对齐轴
export const addAxis = (axis, num) => ({
    type: 'ADD_AXIS',
    axis,
    num
});

//清空对齐轴
export const clearAddAxis = () => ({
    type: 'CLEAR_AXIS'
});