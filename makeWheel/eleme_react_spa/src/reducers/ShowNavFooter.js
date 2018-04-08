export default (state = true, action) => {
    switch (action.type) {
        case 'SHOW_NAV_FOOT':
            return true;
        case 'HIDE_NAV_FOOT':
            return false;
        default:
            return state;
    }
};