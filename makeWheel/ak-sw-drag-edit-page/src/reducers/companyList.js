export default (state = [], action) => {
    switch (action.type) {
        case 'SET_COMPANY_LIST':
            return action.list;
        default:
            return state;
    }
}