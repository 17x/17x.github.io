import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './style.scss';
const NAV_LIST = [
    {
        to: '/',
        text: '首页',
        icon: ''
    }, {
        to: '/discover',
        text: '发现',
        icon: ''
    }, {
        to: '/order',
        text: '订单',
        icon: ''
    }, {
        to: '/profile',
        text: '我的',
        icon: ''
    }
];

export default class Footer extends Component {
    componentDidMount() {

    }

    render() {
        return <footer>
            <div>
                {
                    NAV_LIST.map((val, index) =>
                        <NavLink key={index}
                                 to={val.to}
                                 activeClassName="active">
                            <span> {val.text}</span>
                        </NavLink>
                    )
                }
            </div>
        </footer>;
    }
}