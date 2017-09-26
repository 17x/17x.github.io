import React, {Component} from 'react';
import {Control, Link, Route} from 'react-keeper';

import HomeTab1 from './home-tab-1';
import HomeTab2 from './home-tab-2';
import HomeTab3 from './home-tab-3';
import HomeTab4 from './home-tab-4';
import HomeTab5 from './home-tab-5';

// Home navs
const aHomeHeaderNavs = () => {
    const arr = [{
        itemName: '首页',
        srefLink: 'home/tab1'
    }, {
        itemName: '首页2',
        srefLink: 'home/tab2'
    }, {
        itemName: '首页3',
        srefLink: 'home/tab3'
    }, {
        itemName: '首页4',
        srefLink: 'home/tab4'
    }, {
        itemName: '首页5',
        srefLink: 'home/tab5'
    }];

    let aLists = [];

    arr.map((key, index) => {
        aLists.push(
            <Link to={ key.srefLink } key={index} type="a" className="home-nav-link-item" activeClassName="active">
                {key.itemName}
            </Link>
        );

    });

    return <ul>{aLists}</ul>;
};

class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="home">
                <div>{aHomeHeaderNavs()}</div>
                <Route cache="parent" component={ HomeTab1 } path="/tab1" />
                <Route cache="parent" component={ HomeTab2 } path="/tab2" />
                <Route cache="parent" component={ HomeTab3 } path="/tab3" />
                <Route cache="parent" component={ HomeTab4 } path="/tab4" />
                <Route cache="parent" component={ HomeTab5 } path="/tab5" />
            </div>
        );
    }
}

export default Home;
