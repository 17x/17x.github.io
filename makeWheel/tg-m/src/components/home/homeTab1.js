import React, {Component} from 'react';
import {UISrefActive, UISref, UIView} from '@uirouter/react';
import ScrollView from '../../global/ScrollView.js';

class HomeTab1 extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //console.log('HOMETAB1');
    }

    render() {
        return <ScrollView>
            <div className="homeTab1">
                <br />
                <button type="button" onClick={() => {this.handleClick('increment');}}>+</button>
                <br />
                <button type="button" onClick={() => {this.handleClick('decrement');}}>-</button>
                <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat, ullam.</div>
            </div>
        </ScrollView>;
    }
}

export default HomeTab1;