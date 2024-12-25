import typeCheck from 'utils/typeCheck';

export default (state = [], action) => {
    let arr = [],
        isSub,
        props,
        footId,
        subId;

    switch (action.type) {
        //添加
        case 'ADD_FOOT_ITEM':
            ({isSub, props} = action);
            console.log(state);
            console.log(action);

            let newId,
                newSort,
                footItem = state.filter(val => val.id === props.footId)[0];

            if (isSub) {
                newId = Math.max(...footItem.sub.map(val => val.id)) + 1;
                newSort = Math.max(...footItem.sub.map(val => val.sort)) + 1;
                console.log(newId, newSort);
                if (!newId || !(newId % 1 >= 0)) {
                    newId = 1;
                }
                if (!newSort || !(newSort % 1 >= 0)) {
                    newSort = 1;
                }

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
                            url: props.url ? props.url : '',
                            isRichTextPage: props.isRichTextPage,
                            richPageId: props.richPageId
                        }
                    ]
                } : val);
            } else {
                //ID 增长
                newId = Math.max(...state.map(val => val.id)) + 1;
                //排序增长
                newSort = Math.max(...state.map(val => val.sort)) + 1;

                if (!newId || !(newId % 1 >= 0)) {
                    newId = 1;
                }
                if (!newSort || !(newSort % 1 >= 0)) {
                    newSort = 1;
                }
                arr = [
                    ...state,
                    {
                        id: newId,
                        modelType: props.modelType,
                        text: props.text,
                        // 如果传入则使用，否则使用默认
                        sort: props.sort ? props.sort : (newSort ? newSort : 1),
                        url: props.url ? props.url : '',
                        sub: [],
                        isRichTextPage: props.isRichTextPage,
                        richPageId: props.richPageId,
                        icon: props.icon,
                        iconActive: props.iconActive
                    }
                ];
            }

            break;
        //覆盖
        case 'REPLACE_FOOT_ITEM':
            arr = action.items && action.items.map(val => ({
                ...val
            }));
            break;
        //修改
        case 'MODIFY_FOOT_ITEM':
            ({isSub, props} = action);
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
            ({footId, subId, isSub} = action);
            if (typeCheck(footId) === 'Number') {
                if (isSub) {
                    arr = state.map(val => val.id === footId
                        ? {
                            ...val,
                            sub: val.sub.filter(val2 => val2.id !== subId)
                        }
                        : val);
                    // console.log(arr);
                } else {
                    arr = state.filter(val => val.id !== footId);
                }
            }
            break;
        case 'CLEAR_FOOT_ITEM':
            break;
        default:
            arr = state;
    }

    arr.sort((a, b) => a.sort - b.sort);
    arr.map(val => val.sub && val.sub.sort((a, b) => a.sort - b.sort));
    //console.log(arr);
    return arr;
}