export default (state = false, action) => {
    switch (action.type) {
        case 'SHOW_NAV_HEAD':
            return true;
        case 'HIDE_NAV_HEAD':
            return false;
        default:
            return state;
    }
};