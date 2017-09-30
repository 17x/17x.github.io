import React, {Component} from 'react';
import IScroll from 'iscroll/build/iscroll-probe';

import {UniqueIdService} from './service/commonService';
class ScrollView extends Component {
    state = {
        _id: UniqueIdService.set()
    };

    componentDidMount() {
        const myScroll = new IScroll(
            `#iscroll-wrapper-${this.state._id}`,
            {
                scrollbars: true,
                probeType: 2,
                eventPassthrough: 'horizontal',
                fadeScrollbars: true,
                useTransition: true,
                shrinkScrollbars: 'clip',
                deceleration: 0.001,
                bounceTime: 300
            }
        );

        myScroll.refresh();

        function scrolling() {
            // console.log(this.y);
        }

        function touchend() {
            console.log('touchend');
        }

        function stopScroll() {
            console.log('stopScroll');
        }

        myScroll.on('scroll', scrolling);
        myScroll.on('touchOver', touchend);
        myScroll.on('scrollEnd', stopScroll);
    }

    render() {
        return <div className="iscroll-wrapper" id={`iscroll-wrapper-${this.state._id}`}>
            <div className="iscroll-scroller" id={`iscroll-scroller-${this.state._id}`}>
                <div className="iscroll-scroller-content">{this.props.children}</div>
            </div>
        </div>;
    }
}

export default ScrollView;
