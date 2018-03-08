import typeCheck from 'utils/typeCheck';

export default (state = [], action) => {
    let arr;
    switch (action.type) {
        //添加
        case 'ADD_VIEW_PORT_CONTENT_ITEM':
            let newId = Math.max(...state.map(val => val.id)) + 1,
                newZIndex = Math.max(...state.map(val => val.style.zIndex)) + 1;

            if (!newZIndex || !(newZIndex % 1 >= 0)) {
                newZIndex = 1;
            }
            if (!newId || !(newId % 1 >= 0)) {
                newId = 1;
            }

            arr = [
                ...state,
                {
                    ...action.item,
                    id: newId,
                    style: {
                        ...action.item.style,
                        zIndex: newZIndex
                    }
                }
            ];
            break;
        //覆盖
        case 'REPLACE_VIEW_PORT_CONTENT_ITEM':
            // console.log(action);
            arr = action.items;
            break;
        //修改
        case 'MODIFY_VIEW_PORT_CONTENT_ITEM':
            arr = state.map(val => (
                val.id === action.item.id
                    ? action.item
                    : val
            ));
            break;
        //删除指定或删除全部
        case 'DELETE_VIEW_PORT_CONTENT_ITEM':
            if (typeCheck(action.idOrStr) === 'Number') {
                arr = state.filter(val => val.id !== action.idOrStr);
            }
            break;
        //清空视口外的元素
        case 'DELETE_OUT_VIEWPORT':
            arr = state.filter(val =>
                parseInt(val.style.left) < 100 && parseInt(val.style.left) >= 0
            );
            break;
        case 'CLEAR_VIEW_PORT_CONTENT_ITEM' :
            arr = [];
            break;
        default:
            arr = state;
    }
    return arr;
}