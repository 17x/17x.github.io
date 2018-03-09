import React, {Component} from 'react';
import Navigation from '../../components/Global/Navigation/index';

export default class App extends Component {

    state = {};

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return <div id='container'>
            <div id="content">
                about-content
            </div>
            <footer>
                <Navigation />
            </footer>
        </div>;
    }
}