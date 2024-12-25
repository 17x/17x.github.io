export default (state = [], action) => {
    switch (action.type) {
        case 'SET_BRAND_LIST':
            return action.list;
        default:
            return state;
    }
}