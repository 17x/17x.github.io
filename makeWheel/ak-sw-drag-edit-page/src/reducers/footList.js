import typeCheck from 'utils/typeCheck';

// updatePageHtmlString.html
export default (state = [], action) => {
    let arr = [],
        {isSub, props} = action;

    switch (action.type) {
        //添加
        case 'ADD_FOOT_ITEM':
            let newId,
                newSort,
                footItem = state.filter(val => val.id === props.footId)[0];
            console.log(footItem);
            if (isSub) {
                newId = footItem.sub.map(val => val.id) + 1;
                newSort = footItem.sub.map(val => val.sort) + 1;
                arr = state.map(val => val.id === props.footId ? {
                    ...val,
                    sub: [
                        ...val.sub,
                        {
                            id: newId,
                            modelType: props.modelType,
                            text: props.text,
                            // 如果传入则使用，否则使用默认
                            sort: props.sort ? props.sort : (newSort ? newSort : 1),
                            url: props.url ? props.url : ''
                        }
                    ]
                } : val);
            } else {
                //ID 增长
                newId = Math.max(...state.map(val => val.id)) + 1;
                //排序增长
                newSort = Math.max(...state.map(val => val.sort));

                arr = [
                    ...state,
                    {
                        id: newId,
                        modelType: props.modelType,
                        text: props.text,
                        // 如果传入则使用，否则使用默认
                        sort: props.sort ? props.sort : (newSort ? newSort : 1),
                        url: props.url ? props.url : '',
                        sub: []
                    }
                ];
            }

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
                arr = state.filter(val => val.id !== action.idOrStr);
            }
            break;
        default:
            arr = state;
    }

    arr.sort((a, b) => a.sort - b.sort);
    arr.map(val => val.sub && val.sub.sort((a, b) => a.sort - b.sort));
    return arr;
}