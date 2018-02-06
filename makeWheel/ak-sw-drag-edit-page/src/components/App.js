import React, {Component} from 'react';
import {connect} from 'react-redux';
import Viewport from './viewport';
import DemoArea from './demoArea';
import {LinearProgress} from 'material-ui/Progress';

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
        </div>;
    }
}

let mapStateToProps = ({inDrag, progressLine}) => ({inDrag, progressLine});

let myApp = connect(mapStateToProps)(App);

export default myApp;