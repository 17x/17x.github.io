import React, {Component} from 'react';
import {connect} from 'react-redux';
import Viewport from './viewport';
import EditArea from './editArea';
import {LinearProgress} from 'material-ui/Progress';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div id='container'>
            {this.props.progressLine.show && <LinearProgress />}
            <Viewport />
            <EditArea />
        </div>;
    }
}

let mapStateToProps = ({inDrag, progressLine}) => ({inDrag, progressLine});

let myApp = connect(mapStateToProps)(App);

export default myApp;