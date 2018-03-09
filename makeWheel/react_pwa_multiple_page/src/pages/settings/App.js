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
                settings-content
            </div>
            <div id="footer">
                settings-footer
            </div>
        </div>;
    }
}

export default App;