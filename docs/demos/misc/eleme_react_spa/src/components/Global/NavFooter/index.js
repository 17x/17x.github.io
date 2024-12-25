import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './style.scss';
import 'material-design-icons/iconfont/material-icons.css';

const NAV_LIST = [
    {
        to: '/',
        text: '首页',
        iconName: 'home'
    }, {
        to: '/discover',
        text: '发现',
        iconName: 'find_in_page'
    }, {
        to: '/order',
        text: '订单',
        iconName: 'assignment'
    }, {
        to: '/profile',
        text: '我的',
        iconName: 'person'
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
                                 exact
                                 to={val.to}
                                 activeClassName="active">
                            <i className="material-icons md-36">{val.iconName}</i>
                            <span>{val.text}</span>
                        </NavLink>
                    )
                }
            </div>
        </footer>;
    }
}