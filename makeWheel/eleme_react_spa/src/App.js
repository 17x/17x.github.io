import React, {Component} from 'react';
import NavHead from 'components/Global/NavHead';
import {connect} from 'react-redux';
import {Route} from 'react-router';
import {withRouter} from 'react-router-dom';
import {propTypes, throttle} from 'react-decoration';
import PrivateRoute from 'components/Global/PrivateRoute';
import Home from './pages/Home';
import Footer from 'components/Global/NavFooter';
import routers from './routers';
import PropTypes from 'prop-types';

@withRouter
@connect(({ShowNavHead, ShowNavFooter}) => ({ShowNavHead, ShowNavFooter}))
@propTypes({
    ShowNavHead: PropTypes.bool.isRequired,
    ShowNavFooter: PropTypes.bool.isRequired
})

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
                    val.authNeed
                        ? <PrivateRoute key={index} path={val.path} PrivateComponent={val.component} />
                        : <Route key={index} path={val.path} component={val.component} />
                )
            }
            <Route exact path="/" component={Home} />
            {ShowNavFooter && <Footer />}
        </div>;
    }
}