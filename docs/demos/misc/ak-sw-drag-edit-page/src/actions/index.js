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

//企业列表
export const setCompanyList = list => ({
    type: 'SET_COMPANY_LIST',
    list
});

//类别列表
export const setCategoryList = list => ({
    type: 'SET_CATEGORY_LIST',
    list
});

//类别列表
export const setBrandList = list => ({
    type: 'SET_BRAND_LIST',
    list
});

//清空视口外的元素
export const deleteOutViewport = () => ({
    type: 'DELETE_OUT_VIEWPORT'
});

// 添加新的模板 item
export const addItemToTemplate = item => ({
    type: 'ADD_TEMPLATE_ITEM',
    item
});

// 覆盖模板 list
export const replaceTemplate = items => ({
    type: 'REPLACE_TEMPLATE_ITEM',
    items
});

// 修改 模板 item
export const modifyTemplate = item => ({
    type: 'MODIFY_TEMPLATE_ITEM',
    item
});

// 删除 模板 item
export const deleteTemplateItem = item => ({
    type: 'DELETE_TEMPLATE_ITEM',
    item
});
