import React, {Component} from 'react';
import IScroll from 'iscroll/build/iscroll-probe';

import {UniqueIdService} from './service/commonService';

class Reload extends Component {
    render() {
        const classList = this.props.reloadOptions.isActive ? 'view-reload view-reload-active' : 'view-reload';
        return <div className={classList}>
            <span className="pull-up-icon"></span>
            <span className="pull-up-text">{this.props.reloadOptions.text}</span>
        </div>;
    }
}

class LoadMore extends Component {
    render() {
        const classList = this.props.loadMoreOptions.isActive ? 'view-load-more view-load-more-active' : 'view-load-more';
        return <div className={classList}>
            <span className="pull-down-icon"></span>
            <span className="pull-down-text">{this.props.loadMoreOptions.text}</span>
        </div>;
    }
}

class ScrollView extends Component {
    state = {
        _id: UniqueIdService.set(),
        reloadOptions: {
            text: this.props.options.pullUp.staticText,
            isActive: false,
            isInReload: false
        },
        loadMoreOptions: {
            text: this.props.options.pullBottom.staticText,
            isActive: false,
            isInReload: false
        },
        isLastPage: false
    };

    myScroll = null;

    componentDidMount() {
        let that = this,
            options = this.props.options,
            iscrollOptions = this.props.options.iscrollOptions || {
                    scrollbars: true,
                    probeType: 2,
                    eventPassthrough: 'horizontal',
                    fadeScrollbars: true,
                    useTransition: true,
                    shrinkScrollbars: 'clip',
                    deceleration: 0.001,
                    bounceTime: 300
                },
            myScroll = this.myScroll = new IScroll(`#iscroll-wrapper-${this.state._id}`, iscrollOptions);

        /*立即刷新一次*/
        myScroll.refresh();

        let oScroller = myScroll.wrapper.getElementsByClassName('iscroll-scroller')[0],
            [oReload, oContent, oMore] = oScroller.childNodes;

        console.log(oReload, oContent, oMore);

        /*关闭加载中浮层*/
        setTimeout(() => {
            //scope.splash.enabled = false;
        }, 800);

        /*判断是否开启了分页*/
        if (222) {
            //getDataFromScope();
        }

        function scrolling() {
            let y = this.y;
            //console.log(that);

            /*开启顶部*/
            if (options.pullUp.enabled) {
                /*往下拉 大于指定距离*/
                if (y > 0 && y <= 60) {
                    /*
                    oScroller.style['transform'] =`translateY(${parseInt(y)})`;
                    oScroller.style['msTransform'] =`translateY(${parseInt(y)})`;
                    oScroller.style['webkitTransform'] =`translateY(${parseInt(y)})`;
                    */
                }
                if (y >= 60) {
                    that.setState({
                        reloadOptions: {
                            text: options.pullUp.activeText,
                            isActive: true
                        }
                    });
                }
                if (y < 60 && y > 0) {
                    that.setState({
                        reloadOptions: {
                            text: options.pullUp.staticText,
                            isActive: false
                        }
                    });
                }
            }

            /*开启底部*/
            if (options.pullBottom.enabled) {
                if (y - this.maxScrollY < 0 && !that.state.isLastPage) {
                    /*
                    oScroller.style['transform'] =`translateY(${parseInt((y - this.maxScrollY) / 2})`;
                    oScroller.style['msTransform'] =`translateY(${parseInt((y - this.maxScrollY) / 2})`;
                    oScroller.style['webkitTransform'] =`translateY(${parseInt((y - this.maxScrollY) / 2})`;
                    */
                }
                if ((y - this.maxScrollY) < -60) {
                    console.log('active');
                    that.setState({
                        loadMoreOptions: {
                            text: options.pullBottom.activeText,
                            isActive: true
                        }
                    });
                }

                if ((y - this.maxScrollY) > -60 && (y < this.maxScrollY)) {
                    that.setState({
                        loadMoreOptions: {
                            text: options.pullBottom.staticText,
                            isActive: false
                        }
                    });
                }
            }
        }

        function touchend() {
            // console.log('touchend');
        }

        function stopScroll() {
            //console.log('stopScroll');
        }

        this.myScroll.on('scroll', scrolling);
        this.myScroll.on('touchOver', touchend);
        this.myScroll.on('scrollEnd', stopScroll);
    }

    componentWillUnmount() {
        this.myScroll.destroy();
        this.myScroll = null;
    }

    render() {
        return <div className="iscroll-wrapper" id={`iscroll-wrapper-${this.state._id}`}>
            <div className="iscroll-scroller" id={`iscroll-scroller-${this.state._id}`}>
                <Reload reloadOptions={this.state.reloadOptions} />
                <div className="view-content">{this.props.children}</div>
                <LoadMore loadMoreOptions={this.state.loadMoreOptions} />
            </div>
            <div className="view-splash-wrap">
                <div className="view-splash">
                    <img src="../assets/images/loading.gif" alt="" />
                    <span>加载中...</span>
                </div>
            </div>
            <div className="view-to-top"></div>
        </div>;
    }
}

export default ScrollView;
