import typeCheck from 'utils/typeCheck';

export default (state = [], action) => {
    let arr;
    switch (action.type) {
        //添加
        case 'ADD_VIEW_PORT_CONTENT_ITEM':
            const newId = Math.max(...state.map(val => val.id)) + 1;
            arr = [
                ...state,
                {
                    id: newId,
                    style: action.style,
                    modelType: action.modelType
                }
            ];
            break;
        //覆盖
        case 'REPLACE_VIEW_PORT_CONTENT_ITEM':
            arr = action.items.map(val => ({
                ...val
            }));
            break;
        //修改
        case 'MODIFY_VIEW_PORT_CONTENT_ITEM':
            //console.log(action.style);
            arr = state.map(val => ({
                ...val,
                style: (val.id === action.id) ? action.style : val.style
            }));
            break;
        //删除指定或删除全部
        case 'DELETE_VIEW_PORT_CONTENT_ITEM':
            if (action.idOrStr === 'deleteAll') {
                // arr = [];
            } else if (typeCheck(action.idOrStr) === 'Number') {
                arr = state.filter(val => val.id !== action.idOrStr);
            }
            console.log(action, arr);
            break;
        default:
            arr = state;
    }
    return arr;
}