import React, {Component} from 'react';
import {UIView} from '@uirouter/react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
            <MuiThemeProvider>
                <UIView/>
            </MuiThemeProvider>

            /*<div>
                <MyAwesomeReactComponent />
            </div>*/
        );
    }
}

export default App;