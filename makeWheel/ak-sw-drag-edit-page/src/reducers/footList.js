import typeCheck from 'utils/typeCheck';

export default (state = [], action) => {
    let arr = [];
    switch (action.type) {
        //添加
        case 'ADD_FOOT_ITEM':
            //ID 增长
            const newId = Math.max(...state.map(val => val.id)) + 1,
                //排序增长
                newSort = Math.max(...state.map(val => val.sort));

            arr = [
                ...state,
                {
                    id: newId,
                    modelType: action.modelType,
                    text: action.text,
                    // 如果传入则使用，否则使用默认
                    sort: action.sort ? action.sort : (newSort ? newSort : 1),
                    url: action.url ? action.url : '',
                    sub: []
                }
            ];

            arr.sort((a, b) => a.sort - b.sort);
            arr.map(val => val.sub && val.sub.sort((a, b) => a.sort - b.sort));
            return arr;
        //覆盖
        case 'REPLACE_FOOT_ITEM':
            arr = action.items.map(val => ({
                ...val
            }));
            arr.sort((a, b) => a.sort - b.sort);
            arr.map(val => val.sub && val.sub.sort((a, b) => a.sort - b.sort));
            return arr;
        //修改
        case 'MODIFY_FOOT_ITEM':
            //console.log(action);
            // 是否是子项
            const {isSub, props} = action;
            if (isSub) {
                arr = state.map(val =>
                    val.id === props.id
                        ? {
                            ...val,
                            sub: val.sub.map(val2 =>
                                val2.id === props.item.id
                                    ? props.item
                                    : val2
                            )
                        }
                        : val
                );

                arr.sort((a, b) => a.sort - b.sort);
                arr.map(val => val.sub && val.sub.sort((a, b) => a.sort - b.sort));
                return arr;
            } else {
                arr = state.map(val => val.id === props.id ? {
                    ...val,
                    ...props
                } : val);

                arr.sort((a, b) => a.sort - b.sort);
                arr.map(val => val.sub && val.sub.sort((a, b) => a.sort - b.sort));
                return arr;
            }
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