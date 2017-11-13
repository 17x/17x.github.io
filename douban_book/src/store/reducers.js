// Reducer
function counter(state = {count: 0}, action) {
    console.log(state, action);
    const count = state.count;
    switch (action.type) {
        case 'increase':
            return {count: count + 1};
        default:
            return state;
    }
}

export default counter;