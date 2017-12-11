//显隐侧栏
export const toggleDrawer = () => ({
    type: 'TOGGLE_DRAWER'
});

//登陆
export const authendicated = () => ({
    type: 'AUTHENDICATED'
});

//注销
export const unAuthendicated = () => ({
    type: 'UN_AUTHENDICATED'
});

//全局标题
export const setTitle = text => ({
    type: 'SET_TITLE',
    text
});

//滚动到顶部的按钮
export const toggleToTopButton = type => {
    switch (type) {
        case 'show':
            return {
                type: 'SHOW_TO_TOP_BUTTON'
            };
        case 'hide':
            return {
                type: 'HIDE_TO_TOP_BUTTON'
            };
        default:
            throw new Error('虾毁？');
    }
};

//show which header
export const showWhichHeader = (type) => {
    return {
        type: 'SHOW_WHICH_HEADER',
        header: type === 'global',
    };
};