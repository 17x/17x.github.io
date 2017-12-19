export default (state = {open: false}, action) => {
    switch (action.type) {
        //打开
        case 'OPEN_EDIT_MODAL':
            return {open: true, id: action.id};

        //关闭
        case 'CLOSE_EDIT_MODAL':
            return {open: false};

        default:
            return state;
    }
}