import React, {Component} from 'react';
import {UIView} from '@uirouter/react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// import axios from 'axios';
/*axios.get('http://192.168.1.13:80/ak-sw-tg/pages/m/specialDetail.html?specialId=4')
    .then((resp) => {
        console.log(resp);
    });*/

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <UIView />
                <h1>App .js a1-1125</h1>
            </div>

            /* <MuiThemeProvider>
                 <UIView />
             </MuiThemeProvider>*/
        );
    }
}

export default App;