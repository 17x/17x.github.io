import React from 'react';
import {UISrefActive, UISref} from '@uirouter/react';

const List = () => {
    const aFooterItem = [{
        itemName: '首页',
        srefLink: 'home',
        iconName: 'icon-home'
    }, {
        itemName: '分类',
        srefLink: 'category',
        iconName: 'icon-category'
    }, {
        itemName: '购物车',
        srefLink: 'shoppingCart',
        iconName: 'icon-shoppingCart'
    }, {
        itemName: '我的',
        srefLink: 'usercenter',
        iconName: 'icon-usercenter'
    }];

    let aLists = [];
    aFooterItem.map((key, index) => {
        aLists.push(
            <UISrefActive class="active" className="active-item" key={key.srefLink}>
                <UISref to={key.srefLink}>
                    <a className="menu-item">{key.itemName}</a>
                </UISref>
            </UISrefActive>
            /*<li className={'icon_' + key.srefLink} key={key.srefLink}>{key.itemName}</li>*/
        );

    });
    return <ul>{aLists}</ul>;
};

export default () => (
    <footer>
        <List />
    </footer>
);