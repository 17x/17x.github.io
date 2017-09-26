import React, {Component} from 'react';
import {HashRouter, Route} from 'react-keeper';

import Footer from './global/Footer';
import Home from './Home';
import Miss from './global/Miss';

class App extends Component {
    render() {
        return (
            <HashRouter>
                <div>

                    <Route cache index component={ Home } path="/home" />

                    <Route cache
                           loadComponent={cb => require.ensure([], require => cb(require('./ShoppingCart').default))}
                           path="/shoppingCart" />

                    <Route cache
                           loadComponent={cb => require.ensure([], require => cb(require('./Category').default))}
                           path="/category" />

                    <Route miss
                           component={Miss}
                           path="miss" />

                    <Footer />
                </div>
            </HashRouter>
        );
    }
}

export default App;