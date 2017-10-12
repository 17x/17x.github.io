import React, {Component} from 'react';
import {UISrefActive, UISref, UIView} from '@uirouter/react';
import ScrollView from '../../global/ScrollView.js';

class HomeTab2 extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //console.log('HOMETAB1');
    }

    render() {
        let options = {
            pullUp: {
                enabled: true,
                staticText: '下拉刷新',
                activeText: '松开刷新'
            },
            pullBottom: {
                enabled: true,
                staticText: '上拉加载更多',
                activeText: '松开加载更多'
            }
        };

        return <ScrollView options={options}>
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

export default HomeTab2;