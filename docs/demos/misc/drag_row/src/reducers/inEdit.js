export default (state = false, action) => {
    switch (action.type) {
        case 'SET_EDIT_STATE':
            return action.state;
        default:
            return state;
    }
};