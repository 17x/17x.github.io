import React, {Component} from 'react';
import iscroll from 'iscroll/build/iscroll-probe';
import UniqueIdService from '../global/UniqueIdService';

class IScroll extends Component {
    constructor(props) {
        super(props);
        this.state = {id: UniqueIdService.get()};
        this.btnHandle = this.btnHandle.bind(this);
    }

    btnHandle() {
        let id = UniqueIdService.get('increase');
        this.setState({id});
    }

    render() {
        return (<div>
            <ul>{this.props.children}</ul>
            <h1>{this.state.id} here is id of state</h1>
            <button onClick={this.btnHandle}>btnHandle fa</button>
        </div>);
    }
}

export default IScroll;