import React, {Component} from 'react';
import {UIRouter, UIView, hashLocationPlugin} from '@uirouter/react';
import {StickyStatesPlugin} from '@uirouter/sticky-states';

//import style
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
    router.urlRouter.otherwise('/home');
};

class App extends Component {
    render() {
        return (
            <UIRouter plugins={[hashLocationPlugin, StickyStatesPlugin]}
                      states={states}
                      config={configRouter}>
                <div>
                    <UIView name="home" />
                    <Footer />
                </div>
            </UIRouter>
        );
    };
}

export default App;