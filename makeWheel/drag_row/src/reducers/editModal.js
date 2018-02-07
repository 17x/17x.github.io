export default (state = {open: false}, action) => {
    switch (action.type) {
        //打开
        case 'OPEN_EDIT_MODAL':
            return {
                open: true,
                manipulation: action.manipulation, // add , edit
                from: action.from, // content , foot , foot-sub
                id: action.id,
                subId: action.subId
            };

        //关闭
        case 'CLOSE_EDIT_MODAL':
            return {open: false};

        default:
            return state;
    }
}