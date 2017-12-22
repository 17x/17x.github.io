import typeCheck from '../assets/util/typeCheck';

export default (state = [], action) => {
    switch (action.type) {
        //添加
        case 'ADD_FOOT_ITEM':
            const newId = Math.max(...state.map(val => val.id)) + 1,
                newSort = Math.max(...state.map(val => val.sort));

            return [
                ...state,
                {
                    id: newId,
                    modelType: action.modelType,
                    text: action.text,
                    sort: action.sort ? action.sort : (newSort ? newSort : 1),
                    url: action.url,
                    sub: []
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