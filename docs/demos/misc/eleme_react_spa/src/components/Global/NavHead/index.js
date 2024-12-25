import React, {Component} from 'react';
// import update from 'immutability-helper';
import './style.scss';

export default class NavHead extends Component {
    componentDidMount() {

    }

    render() {
        return <header className='NavHead'>
            <div>back</div>
            <div>titleCenter</div>
            <div>other</div>
        </header>;
    }
}