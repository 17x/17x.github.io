import React, {Component} from 'react';
import {UISrefActive, UISref, UIView} from '@uirouter/react';

import Header from '../common/header';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    state = ({
        num: 2
    });

    render() {
        //console.log(this.props);
        const {stateService} = this.props.transition.router;
        console.log(this.props.transition.router.stateService.reload());

        let style1 = {display: stateService.includes('home.tab1') ? 'block' : 'none'},
            style2 = {display: stateService.includes('home.tab2') ? 'block' : 'none'},
            style3 = {display: stateService.includes('home.tab3') ? 'block' : 'none'},
            style4 = {display: stateService.includes('home.tab4') ? 'block' : 'none'},
            style5 = {display: stateService.includes('home.tab5') ? 'block' : 'none'};
        /*
                console.log(
                    style1,
                    style2,
                    style3,
                    style4,
                    style5
                );
        */

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
                    <div className="homeTab1" style={style1}><UIView name="homeTab1" /></div>
                    <div className="homeTab2" style={style2}><UIView name="homeTab2" /></div>
                    <div className="homeTab3" style={style3}><UIView name="homeTab3" /></div>
                    <div className="homeTab4" style={style4}><UIView name="homeTab4" /></div>
                    <div className="homeTab5" style={style5}><UIView name="homeTab5" /></div>
                </div>
            </div>
        </div>);
    }
}

export default Home;