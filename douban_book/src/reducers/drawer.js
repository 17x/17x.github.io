export default (drawer = false, action) => {
    switch (action.type) {
        case 'TOGGLE_DRAWER':
            return !drawer;
        default:
            return drawer;
    }
}