import React, {Component} from 'react';
import {connect} from 'react-redux';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Viewport from './Viewport';
import DemoArea from './Demo';
import {LinearProgress} from 'material-ui/Progress';

@DragDropContext(HTML5Backend)
class App extends Component {
    constructor(props) {
        super(props);
    }

    componentWillUnmount() {

    }

    componentDidMount() {
        // this.domRef.onselectstart = () => false;
        this.domRef.oncontextmenu = () => false;
    }

    render() {
        return <div id='container' ref={domRef => this.domRef = domRef}>
            {this.props.progressLine.show && <LinearProgress />}
            <DemoArea />
            <Viewport />
        </div>;
    }
}

let mapStateToProps = ({inDrag, progressLine}) => ({inDrag, progressLine});

let myApp = connect(mapStateToProps)(App);

export default myApp;