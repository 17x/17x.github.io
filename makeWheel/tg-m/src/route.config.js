import React, {Component} from 'react';
import {UIRouter, UIView, hashLocationPlugin} from '@uirouter/react';
import {StickyStatesPlugin} from '@uirouter/sticky-states';

// import style
import './global/normalize.scss';
import './global/base.scss';
import './global/public.scss';

// import components
import Footer from './components/common/footer';

import homeState from './components/home/route';
import categoryState from './components/category/route';
import cartState from './components/cart/route';
import userState from './components/user/route';

/*

const router = new UIRouterReact();
router.plugin(servicesPlugin);
router.plugin(hashLocationPlugin);
router.plugin(StickyStatesPlugin);

router.urlRouter.otherwise('/home');

homeState.map((val) => {
    router.stateRegistry.register(val);
});
router.stateRegistry.register(categoryState);
router.stateRegistry.register(cartState);
router.stateRegistry.register(userState);

router.start();

router.transitionService.onEnter ({to:'*'},(...rest) => {
    console.log('onEnter',rest);
});

class App extends Component {
    render() {
        return (
            <UIRouter router={router}>
                <div>
                    <UIView name="home" />
                    <Footer />
                </div>
            </UIRouter>
        );
    };
}
*/

let states = [];
states = states.concat(homeState);
states = states.concat(categoryState);
states = states.concat(cartState);
states = states.concat(userState);

const configRouter = router => {

    // default to home
    router.urlRouter.otherwise('/home');

    //transition watch
    router.transitionService.onEnter({}, (trans, state) => {
        // ...
        //console.log(trans, state);
    });
};

class App extends Component {
    render() {
        return (
            <UIRouter plugins={[hashLocationPlugin, StickyStatesPlugin]}
                      states={states}
                      config={configRouter}>
                <div>
                    <UIView name="home" />
                    <UIView name="category" />
                    <UIView name="cart" />
                    <UIView name="user" />
                    <Footer />
                </div>
            </UIRouter>
        );
    };
}

export default App;