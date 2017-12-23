import typeCheck from 'utils/typeCheck';

export default (state = [], action) => {
    let arr = [],
        {isSub, props} = action;
    console.log({isSub, props});
    switch (action.type) {
        //添加
        case 'ADD_FOOT_ITEM':
            let newId, newSort;
            //ID 增长
            newId = Math.max(...state.map(val => val.id)) + 1;
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
            break;
        //覆盖
        case 'REPLACE_FOOT_ITEM':
            arr = action.items.map(val => ({
                ...val
            }));
            break;
        //修改
        case 'MODIFY_FOOT_ITEM':
            // 是否是子项
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
                break;
            }
        //删除指定或删除全部
        case 'DELETE_FOOT_ITEM':
            if (action.idOrStr === 'deleteAll') {
                arr = [];
            } else if (typeCheck(action.idOrStr) === 'Number') {
                arr = state.filter(val => val.id !== action.id);
            }
            break;
        default:
            arr = state;
    }

    arr.sort((a, b) => a.sort - b.sort);
    arr.map(val => val.sub && val.sub.sort((a, b) => a.sort - b.sort));
    return arr;
}