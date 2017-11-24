import React, {Component} from 'react';
import {Child_1App} from '../containers/ChildApp';
import {Child_2App} from '../containers/ChildApp';

class App extends Component {
    render() {
        const style = {
            border: '1px solid black',
            width: '500px',
            padding: '20px'
        };

        return (
            <div style={style}>
                <h1>App - All Comps's parent</h1>
                <Child_1App />
                <Child_2App />
            </div>
        );
    }
}

export default App;