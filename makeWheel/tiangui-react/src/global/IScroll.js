import React, {Component} from 'react';
import iscroll from 'iscroll/build/iscroll-probe';
import UniqueIdService from '../global/UniqueIdService';

class IScroll extends Component {
    constructor(props) {
        super(props);
        this.btnHandle = this.btnHandle.bind(this);
    }

    btnHandle() {
        let id = UniqueIdService.get('increase');
        // this.setState({id});
    }

    render() {
       {/* <div class="iscroll-wrapper" id="{{'iscroll-wrapper-'+$id}}" ng-cloak>
            <div class="iscroll-scroller iscroll-scroller-y" id="{{'iscroll-scroller-'+$id}}">
                <div class="iscroll-reload" ng-class="{isActive:pullUp.isActive,isInReload:pullUp.isInReload}" ng-show="pullUp.enabled">
                    <span class="pullUpIcon">&nbsp;</span>
                    <span class="pullUpText">{{pullUp.text}}</span>
                </div>
                <div class="iscroll-scroller-content" ng-transclude></div>
                <div class="iscroll-update" ng-class="{isActive:pullDown.isActive,isInUpdate:pullDown.isInUpdate}" ng-show="pullDown.enabled && !isLastPage">
                    <span class="pullDownIcon"></span>
                    <span class="pullDownText">{{pullDown.text}}</span>
                </div>
            </div>
            <div class="iscroll-splash" ng-if="splash.enabled">
                <div class="iscroll-splash-wrap">
                    <img src="assets/img/public/loading.gif" alt="" />
                    <span>加载中...</span>
                </div>
            </div>
            <div class="iscroll-toTop" ng-show="toTop.enabled && toTop.isShow" ng-click="toTop.scrollToTop()"></div>
        </div>
*/}
        return (<div>
            <ul>{this.props.children}</ul>
            {/*<button onClick={this.btnHandle}>btnHandle fa</button>*/}
        </div>);
    }
}

export default IScroll;