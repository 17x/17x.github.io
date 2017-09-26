import React, {Component} from 'react';
import {UISrefActive, UISref, UIView} from '@uirouter/react';

class HomeTab1 extends Component {
    constructor(props) {
        super(props);
        //console.log(this.props);
    }

    state = {
        num: 9
    };

    handleClick(param) {
        this.setState({
            num: param === 'increment' ? this.state.num + 1 : this.state.num - 1
        });
    }

    render() {
        return <div>
            <p>{this.state.num}</p>
            <br />
            <button type="button" onClick={() => {this.handleClick('increment');}}>+</button>
            <br />
            <button type="button" onClick={() => {this.handleClick('decrement');}}>-</button>
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat, ullam.</div>
        </div>;
    }
}

export default HomeTab1;