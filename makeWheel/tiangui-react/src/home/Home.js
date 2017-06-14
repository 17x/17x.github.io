import React, {Component} from 'react';
import Footer from '../global/Footer';
import {UIView, UISrefActive, UISref} from '@uirouter/react';

// home navs
const aHomeHeaderNavs = () => {
    const arr = [{
        itemName: '首页',
        srefLink: 'tab1'
    }, {
        itemName: '首页2',
        srefLink: 'tab2'
    }, {
        itemName: '首页3',
        srefLink: 'tab3'
    }, {
        itemName: '首页4',
        srefLink: 'tab4'
    }, {
        itemName: '首页5',
        srefLink: 'tab5'
    }];

    let aLists = [];

    arr.map((key, index) => {
        aLists.push(
            <UISrefActive class="active" className="active-item" key={index}>
                <UISref to={key.srefLink}>
                    <a className="menu-item">{key.itemName}</a>
                </UISref>
            </UISrefActive>
        );

    });

    return <ul>{aLists}</ul>;
};

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="home">

                <div>{aHomeHeaderNavs()}</div>
                <UIView/>
                <Footer/>
            </div>
        );
    }
}

export default Home;
