import React from 'react';
import {component} from 'react-decoration';

@component
class App {

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
            <div id="footer">
                home-footer
            </div>
        </div>;
    }
}

export default App;