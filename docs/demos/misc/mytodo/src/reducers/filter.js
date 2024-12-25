export default (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case 'FILTER_TODO':
            return action.filter;
        default:
            return state;
    }
};