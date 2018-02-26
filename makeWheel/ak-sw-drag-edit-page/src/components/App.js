import React, {Component} from 'react';
import {connect} from 'react-redux';
import {LinearProgress} from 'material-ui/Progress';
import Viewport from './viewport';
import DemoArea from './demoArea';
import PreView from './preview';

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentWillUnmount() {

    }

    componentDidMount() {
        this.domRef.onselectstart = () => false;
        this.domRef.oncontextmenu = () => false;
    }

    render() {
        return <div id='container' ref={domRef => this.domRef = domRef}>
            {this.props.progressLine.show && <LinearProgress />}
            <Viewport />
            <DemoArea />
            <PreView />
        </div>;
    }
}

let mapStateToProps = ({inDrag, progressLine}) => ({inDrag, progressLine});

let myApp = connect(mapStateToProps)(App);

export default myApp;