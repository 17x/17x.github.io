export default (state = [], action) => {
    switch (action.type) {
        case 'SET_CATEGORY_LIST':
            return action.list;
        default:
            return state;
    }
}