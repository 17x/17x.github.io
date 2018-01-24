export default (authenticated = false, action) => {
    switch (action.type) {
        case 'AUTHENDICATED':
            return true;
        case 'UN_AUTHENTICATED':
            return false;
        case 'GET_AUTHENTICATED':
        default:
            return authenticated;
    }
}