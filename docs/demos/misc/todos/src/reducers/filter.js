export default (state = 'SHOW_ALL', action) => {
    console.log(state, action);
    switch (action.type) {
        case 'FILTER_TODO':
            return action.filter;
        default:
            return state;
    }
};