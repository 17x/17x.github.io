import Login from '../login/Login';

const loginState = {
    parent: 'app',
    name: 'login',
    url: '/login',
    component: Login,
    resolve: {returnTo: returnTo}
};

function returnTo($transition$) {
    let redirectedFrom = $transition$.previous();
    // The user was redirected to the login state (via the requiresAuth hook)
    if (redirectedFrom != null) {
        // Follow the current transition's redirect chain all the way back to the original attempted transition
        while (redirectedFrom.previous()) {
            redirectedFrom = redirectedFrom.previous();
        }
        // return to the original attempted "to state"

        return {state: redirectedFrom.to(), params: redirectedFrom.params('to')};
    }

    // The user was not redirected to the login state; they directly activated the login state somehow.
    // Return them to the state they came from.
    let fromState = $transition$.from();
    let fromParams = $transition$.params('from');

    if (fromState.name !== '') {
        return {state: fromState, params: fromParams};
    }

    // If the fromState's name is empty, then this was the initial transition. Just return them to the Home state
    return {state: 'home'};
}

export default loginState;