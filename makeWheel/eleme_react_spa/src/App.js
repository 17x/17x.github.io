import React, {Component} from 'react';
import NavHead from 'components/Global/NavHead';
import {connect} from 'react-redux';
import {Route} from 'react-router';
import {withRouter} from 'react-router-dom';
import {throttle} from 'react-decoration';
import Home from './pages/Home';
import Footer from 'components/Global/NavFooter';
import routers from './routers';

@withRouter
@connect(({ShowNavHead, ShowNavFooter}) => ({ShowNavHead, ShowNavFooter}))
export default class App extends Component {
    state = {};

    @throttle(750, {trailing: false})
    setRootFontSize() {
        document.documentElement.style.fontSize = innerWidth / 10 + 'px';
    }

    componentWillUnmount() {
        window.removeEventListener('load', this.setRootFontSize);
        window.removeEventListener('resize', this.setRootFontSize);
        window.removeEventListener('orientationchange', this.setRootFontSize);
    }

    componentDidMount() {
        window.addEventListener('load', this.setRootFontSize);
        window.addEventListener('resize', this.setRootFontSize);
        window.addEventListener('orientationchange', this.setRootFontSize);
        document.body.style.fontSize = '24px';
    }

    render() {
        const {ShowNavHead, ShowNavFooter} = this.props;
        return <div id='container'>
            {
                ShowNavHead ? <NavHead /> : undefined
            }
            {
                routers.map((val, index) =>
                    <Route key={index}
                           path={val.path}
                           component={val.component}/>
                )
            }
            <Route exact path="/" component={Home}/>
            {ShowNavFooter && <Footer />}
        </div>;
    }
}