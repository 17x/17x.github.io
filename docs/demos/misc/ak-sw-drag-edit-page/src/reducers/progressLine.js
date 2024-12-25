export default (state = {show: false}, action) => {
    switch (action.type) {
        //打开
        case 'SHOW_PROGRESS_LINE':
            return {show: true};
        //关闭
        case 'HIDE_PROGRESS_LINE':
            return {show: false};
        default:
            return state;
    }
}