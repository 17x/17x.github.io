import React, {Component} from 'react';
import {UIRouter, UIView, hashLocationPlugin} from '@uirouter/react';

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

let states = [];
states = states.concat(homeState);
states = states.concat(categoryState);
states = states.concat(cartState);
states = states.concat(userState);

const configRouter = router => {
    //console.log(router.urlService.listen());
    // console.log(router.stateService.current);
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
            <UIRouter plugins={[hashLocationPlugin]}
                      states={states}
                      config={configRouter}>
                <div>
                    <UIView/>
                    <Footer />
                </div>
            </UIRouter>
        );
    };
}

export default App;