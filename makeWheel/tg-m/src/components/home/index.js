import React, {Component} from 'react';
import {UISrefActive, UISref, UIView} from '@uirouter/react';
import axios from 'axios';
import qs from 'qs';

import  './home.scss';
import Header from '../common/header';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    state = ({
        homeMenuList: []
    });

    componentDidMount() {
        //console.log('HOME componentDidMount');
        axios.post('getMenuByType.html', qs.stringify({id: 3}))
            .then(resp => {
                this.setState({
                    homeMenuList: resp.data.object
                });
            });
    }

    render() {
        return <div className="home scroll-content scroll-content-top scroll-content-bottom">
            <Header />
            <ul className="tabHeader row">
                {this.state.homeMenuList.map((val, index) => (
                    <UISrefActive class="active" key={index}>
                        <UISref to={'.tab' + (index + 1).toString()}>
                            <a className="col-fifth text-center height100p">
                                {val.name}
                            </a>
                        </UISref>
                    </UISrefActive>
                ))}
            </ul>
            <div className="homeTabBoxsWrap">
                <UIView name="home" />
            </div>
        </div>;
    }
}

export default Home;