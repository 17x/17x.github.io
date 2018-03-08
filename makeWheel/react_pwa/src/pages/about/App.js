import React from 'react';
import {component} from 'react-decoration';

@component
export default class App {

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
            <div id="footer">
                about-footer
            </div>
        </div>;
    }
}