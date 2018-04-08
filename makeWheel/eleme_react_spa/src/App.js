import React, {Component} from 'react';
import NavHead from 'components/Global/NavHead';
import {connect} from 'react-redux';
import {Route} from 'react-router';
import {withRouter} from 'react-router-dom';
import {throttle} from 'react-decoration';
import Home from './pages/Home';
// import routers from './routers';
import Footer from 'components/Global/Footer';
import Loading from 'components/Loading';
import Loadable from 'react-loadable';
import {aboutRoute} from './pages/About';
import {discoverRoute} from './pages/Discover';
let routers = [
    aboutRoute,
    discoverRoute
].map(val => ({
        ...val,
        component: Loadable({
            loader: () => import(`./pages/${val.page}`),
            loading: Loading,
            delay: 100
        })
    })
);

const mapStateToProps = ({ShowNavHead}) => ({ShowNavHead});
@connect(mapStateToProps)
class App extends Component {
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
        const {ShowNavHead} = this.props.ShowNavHead;
        return <div id='container'>
            {
                ShowNavHead ? <NavHead /> : undefined
            }
            {
                routers.map((val, index) =>
                    <Route key={index}
                           path={val.path}
                           component={val.component} />
                )
            }
            <Route exact path="/" component={Home} />
            <Footer />
        </div>;
    }
}

export default withRouter(App);