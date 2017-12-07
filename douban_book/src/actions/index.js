export const toggleDrawer = () => ({
    type: 'TOGGLE_DRAWER'
});

export const authendicated = () => ({
    type: 'AUTHENDICATED'
});

export const unAuthendicated = () => ({
    type: 'UN_AUTHENDICATED'
});

export const setTitle = text => ({
    type: 'SET_TITLE',
    text
});