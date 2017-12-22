import typeCheck from '../assets/util/typeCheck';

export default (state = [], action) => {
    switch (action.type) {
        //添加
        case 'ADD_VIEW_PORT_CONTENT_ITEM':
            const newId = Math.max(...state.map(val => val.id)) + 1;
            return [
                ...state,
                {
                    id: newId,
                    style: action.style,
                    modelType: action.modelType
                }
            ];

        //覆盖
        case 'REPLACE_VIEW_PORT_CONTENT_ITEM':
            return action.items.map(val => ({
                ...val
            }));

        //修改
        case 'MODIFY_VIEW_PORT_CONTENT_ITEM':
            //console.log(action.style);
            return state.map(val => ({
                ...val,
                style: (val.id === action.id) ? action.style : val.style
            }));
        //删除指定或删除全部
        case 'DELETE_VIEW_PORT_CONTENT_ITEM':
            if (action.idOrStr === 'deleteAll') {
                return [];
            } else if (typeCheck(action.idOrStr) === 'Number') {
                return state.filter(val => val.id !== action.id);
            }
            break;
        default:
            return state;
    }
}