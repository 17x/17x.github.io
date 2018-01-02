import React, {Component} from 'react';
import {connect} from 'react-redux';
import Viewport from './viewport';
import EditArea from './editArea';
import {LinearProgress} from 'material-ui/Progress';

// todo 添加内容区域与底部模板 添加轮播图模板
// 拉长到滚动时 点击变窄 往上拉变短
class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.domRef.onselectstart = () => false;
        this.domRef.oncontextmenu = () => false;
    }

    render() {
        return <div id='container' ref={domRef => this.domRef = domRef}>
            {this.props.progressLine.show && <LinearProgress />}
            <Viewport />
            <EditArea />
        </div>;
    }
}

let mapStateToProps = ({inDrag, progressLine}) => ({inDrag, progressLine});

let myApp = connect(mapStateToProps)(App);

export default myApp;