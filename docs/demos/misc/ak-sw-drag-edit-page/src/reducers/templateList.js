// import typeCheck from 'utils/typeCheck';

export default (state = [], action) => {
    let arr;
    switch (action.type) {
        //添加
        case 'ADD_TEMPLATE_ITEM':
            let newId = Math.max(...state.map(val => val.id)) + 1;
            if (!newId || !(newId % 1 >= 0)) {
                newId = 1;
            }

            arr = [
                ...state,
                {
                    ...action.item,
                    id: newId
                }
            ];
            break;
        //覆盖
        case 'REPLACE_TEMPLATE_ITEM':
            //console.log('action',action);
            arr = action.items && action.items.map(val => ({
                ...val
            }));
            break;
        //修改
        case 'MODIFY_TEMPLATE_ITEM':
            //console.log(action.item);
            arr = state.map(val => (
                val.id === action.item.id
                    ? {
                        ...action.item
                    }
                    : val
            ));
            break;
        //删除指定或删除全部
        case 'DELETE_TEMPLATE_ITEM':
            arr = state.filter(val => val.id !== action.item.id);
            break;
        default:
            arr = state;
    }
    return arr;
}