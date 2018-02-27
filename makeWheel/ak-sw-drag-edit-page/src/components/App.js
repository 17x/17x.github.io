import React, {Component} from 'react';
import {connect} from 'react-redux';
import {LinearProgress} from 'material-ui/Progress';
import Viewport from './viewport';
import DemoArea from './demoArea';
import PreView from './preview';
import getDom from 'utils/getDom';

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentWillUnmount() {}

    componentDidMount() {
        // getDom('#root').onselectstart = () => false;
        this.domRef.oncontextmenu = () => false;
    }

    render() {
        return <div id='container' ref={domRef => this.domRef = domRef}>
            {this.props.progressLine.show && <LinearProgress />}
            <DemoArea />
            <Viewport />
            <PreView />
        </div>;
    }
}

let mapStateToProps = ({inDrag, progressLine}) => ({inDrag, progressLine});

let myApp = connect(mapStateToProps)(App);

export default myApp;