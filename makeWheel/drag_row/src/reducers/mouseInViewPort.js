export default (state = false, action) => {
    switch (action.type) {
        case 'SET_MOUSE_IN_VIEWPORT':
            return action.state;
        default:
            return state;
    }
}