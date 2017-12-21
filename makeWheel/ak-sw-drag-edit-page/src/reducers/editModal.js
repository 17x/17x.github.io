export default (state = {open: false}, action) => {
    switch (action.type) {
        //打开
        case 'OPEN_EDIT_MODAL':
            return {
                open: true,
                manipulation: action.manipulation, // add , edit
                id: action.id,
                from: action.from, // content , foot , foot-sub
                parentId: action.parentId
            };

        //关闭
        case 'CLOSE_EDIT_MODAL':
            return {open: false};

        default:
            return state;
    }
}