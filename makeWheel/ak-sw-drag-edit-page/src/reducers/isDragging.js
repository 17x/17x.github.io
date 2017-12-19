export default (state = false, action) => {
    switch (action.type) {
        case 'SET_DRAG_STATE':
            return action.state;
        default:
            return state;
    }
}