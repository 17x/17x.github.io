export const logIn = action => {
    return {
        type: 'SET_AUTHENTICATED_LOGGED_IN',
        authData: action.authData
    };
};

export const logOut = action => {
    return {
        type: 'SET_AUTHENTICATED_LOGGED_OUT'
    };
};