import typeCheck from '../assets/util/typeCheck';

export default (state = [], action) => {
    switch (action.type) {
        //添加
        case 'ADD_FOOT_ITEM':
            return [
                ...state,
                {
                    id: action.idOrStr,
                    style: action.style,
                    modelType: action.modelType
                }
            ];
        //覆盖
        case 'REPLACE_FOOT_ITEM':
            return action.items.map(val => ({
                ...val
            }));
        //修改
        case 'MODIFY_FOOT_ITEM':
            return state.items.map(val => val.id === action.obj.id ? action.obj : val);
        //删除指定或删除全部
        case 'DELETE_FOOT_ITEM':
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