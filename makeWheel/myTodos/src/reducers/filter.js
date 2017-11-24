export default (state = 'show_all', action) => {
    switch (action.filter) {
        case 'FILTER_TODO':
            return action.filter;
        default:
            return state;
    }
};