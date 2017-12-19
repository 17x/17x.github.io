import React, {Component} from 'react';
import {connect} from 'react-redux';
import Viewport from './viewport';
import EditArea from './editArea';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        //console.log(this.props.inDrag);
        return <div id='container'>
            <Viewport />
            <EditArea />
        </div>;
    }
}

let mapStateToProps = state => ({
    inDrag: state.inDrag
});

let myApp = connect(mapStateToProps)(App);

export default myApp;