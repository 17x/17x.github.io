import React, {Component} from 'react';
import {
    HashRouter as Router,
    Route,
    Link,
    Redirect,
    Switch,
    withRouter
} from 'react-router-dom';

// import components
import Footer from './components/common/footer';

import Home from './components/home';
import Category from './components/category';
import Cart from './components/cart';
import User from './components/user';

//import style
import './global/normalize.scss';
import './global/base.scss';
import './global/public.scss';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Redirect exact from="/home" exact to="/home/1" />
                        {/*<Route exact path='/home' component={Home} />*/}
                        <Route path="/category" component={Category} />
                        <Route path="/cart" component={Cart} />
                        <Route path="/user" component={User} />
                    </Switch>
                    <Footer />
                </div>
            </Router>
        );
    };
}

export default App;