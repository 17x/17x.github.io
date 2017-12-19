import typeCheck from '../assets/util/typeCheck';

export default (state = [], action) => {
    switch (action.type) {
        //添加
        case 'ADD_VIEW_PORT_CONTENT_ITEM':
            return [
                ...state,
                {
                    id: action.idOrStr,
                    style: action.style,
                    modelType: action.modelType,
                    // 为模态编辑框预留的属性
                    editAbleStyleForModal: null,
                    // 为resize或drag预留的属性
                    editAbleStyleForInner: null
                }
            ];

        //覆盖
        case 'CHANGE_VIEW_PORT_CONTENT_ITEM':
            return action.items.map(val => ({
                ...val,
                // 为模态编辑框预留的属性
                editAbleStyleForModal: null,
                // 为resize或drag预留的属性
                editAbleStyleForInner: null
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