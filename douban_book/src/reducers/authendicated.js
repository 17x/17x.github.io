export default (authenticated = false, action) => {
    switch (action.type) {
        case 'AUTHENDICATED':
            return true;
        case 'UN_AUTHENDICATED':
            return false;
        default:
            return authenticated;
    }
}