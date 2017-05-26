import React, {Component} from 'react';
import {UIView} from 'ui-router-react';

class App extends Component {
    constructor(props) {
        super(props);
    }

    /*
        handleLogout = () => {
            // let
        };*/

    render() {
        return (
            <div>
                <span>App</span>
                <UIView/>
            </div>
        );
    }
}

export default App;