import React, {Component} from 'react';
import IScroll from 'iscroll/build/iscroll-probe';
import {UniqueIdService} from './service/commonService';

class ScrollView extends Component {
    state = {
        _id: UniqueIdService.set()
    };

    componentDidMount() {
        // console.log('ScrollView');
        const oDom = document.getElementById(`iscroll-wrapper-${this.state._id}`),
            myScroll = new IScroll(oDom, {
                scrollbars: true,
                probeType: 2,
                eventPassthrough: 'horizontal',
                fadeScrollbars: true,
                useTransition: true,
                // bounceEasing: 'quadratic',
                shrinkScrollbars: 'clip',
                deceleration: 0.001,
                bounceTime: 300
            });
        console.log(myScroll)
    }

    render() {
        const _id = UniqueIdService.set();

        return <div className="iscroll-wrapper" id={`iscroll-wrapper-${this.state._id}`}>
            <div className="iscroll-scroller iscroll-scroller-y" id={`iscroll-scroller-${this.state._id}`}>
                <div className="iscroll-reload">
                    <span className="pullUpIcon">&nbsp;</span>
                    <span className="pullUpText"></span>
                </div>
                <div className="iscroll-scroller-content">{this.props.children}</div>
                <div className="iscroll-update">
                    <span className="pullDownIcon"></span>
                    <span className="pullDownText"></span>
                </div>
            </div>
            <div className="iscroll-splash">
                <div className="iscroll-splash-wrap">
                    <img src="assets/img/public/loading.gif" alt="" />
                    <span>加载中...</span>
                </div>
            </div>
            <div className="iscroll-toTop"></div>
        </div>;
    }
}

export default ScrollView;
