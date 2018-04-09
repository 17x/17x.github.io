export default (state = {isAuthenticated: false}, action) => {
    switch (action.type) {
        case 'SET_AUTHENTICATED_LOGGED_IN':
            return {
                ...action.authData,
                isAuthenticated: true
            };
        case 'SET_AUTHENTICATED_LOGGED_OUT':
            return {isAuthenticated: false};
        default:
            return state;
    }
};