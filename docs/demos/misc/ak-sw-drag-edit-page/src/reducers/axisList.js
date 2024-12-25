export default (state = [], action) => {
    switch (action.type) {
        //打开
        case 'ADD_AXIS':
            return [
                ...state,
                {
                    axisType: action.axis,
                    pixel: action.num
                }];
        //关闭
        case 'CLEAR_AXIS':
            return [];
        default:
            return state;
    }
}