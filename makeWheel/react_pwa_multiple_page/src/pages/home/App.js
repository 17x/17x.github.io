import React, {Component} from 'react';
import Navigation from '../../components/Global/Navigation/index';
import {hot} from 'react-hot-loader';

class App extends Component {

    state = {};

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return <div id='container'>
            <div id="content">
                home-content
            </div>
            <footer>
                <Navigation />
            </footer>
        </div>;
    }
}

// export default App;
export default hot(module)(App);
