import React, {Component} from 'react';

import {UISrefActive, UISref} from '@uirouter/react';

const footerItems = [
    {text: '首页', className: 'icon_home', sref: 'home'},
    {text: '分类', className: 'icon_cate', sref: 'category'},
    {text: '购物车', className: 'icon_cart', sref: 'cart'},
    {text: '我的', className: 'icon_user', sref: 'user'}
];

class Footer extends Component {
    render() {
        return <footer>
            {footerItems.map((val, index) => (
                <UISrefActive class="active" key={index}>
                    <UISref to={val.sref}>
                        <a>
                            <i className={val.className}></i>
                            <span>{val.text}</span>
                        </a>
                    </UISref>
                </UISrefActive>
            ))}
        </footer>;

    }
}

export default Footer;