import React, {Component} from 'react';
import {HashRouter, Route} from 'react-keeper';

import Footer from './global/Footer';
import Home from './Home';

class App extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <Route miss
                           loadComponent={cb => require.ensure([], require => cb(require('./global/Miss').default))}
                           path="miss" />
                    <Route cache component={ Home } path="home" />

                    <Route cache
                           loadComponent={cb => require.ensure([], require => cb(require('./ShoppingCart').default))}
                           path="shoppingCart" />

                    <Route cache
                           loadComponent={cb => require.ensure([], require => cb(require('./Category').default))}
                           path="category" />

                    {/*<Route component={ Products } path="/products" enterFilter={ loginFilter }>*/}
                    {/*<Route component={ Detail } path="/item/:id" time={new Date().toLocaleString()}/>*/}

                    <Footer />
                </div>
            </HashRouter>
        );
    }
}

export default App;