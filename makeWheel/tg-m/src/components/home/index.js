import React, {Component} from 'react';
import {UISrefActive, UISref, UIView} from '@uirouter/react';

import  './home.scss'
import Header from '../common/header';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    state = ({
        num: 2
    });

    componentDidMount() {
        console.log('HOME componentDidMount');
    }

    render() {
        return (<div className="home">
            <Header />
            <div className="scroll-content scroll-content-top scroll-content-bottom">
                <ul className="tabHeader row">
                    {[1, 2, 3, 4, 5].map((val, index) => (
                        <UISrefActive class="active" key={index}>
                            <UISref to={'.tab' + val.toString()}>
                                <a key={index}
                                   className="col-fifth text-center height100p">
                                    {val.toString()}
                                </a>
                            </UISref>
                        </UISrefActive>
                    ))}
                </ul>
                <div>
                   <UIView name="home" />
                </div>
            </div>
        </div>);
    }
}

export default Home;