import React, {Component} from 'react';

import {HashRouter as Router, Route} from 'react-router-dom';

import {connect} from 'react-redux';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import KeyboardArrowUp from 'material-ui-icons/KeyboardArrowUp';

import GlobalDrawer from './global/GlobalDrawer';
import Home from 'bundle-loader?lazy!./home/index';
import Favorites from 'bundle-loader?lazy!./favorites/index';
import Detail from 'bundle-loader?lazy!./detail/index';

import '../assets/styles/public.scss';
import styles from './style';

import scrollToTop from '../assets/util/scrollToTop';

import {toggleToTopButton} from '../actions';
import Bundle from './global/Bundle';

/*axios defaults*/
/*axios.defaults.baseURL = 'http://192.168.1.13:80/ak-sw-tg/pages/m/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = false;*/

let routes = [
    {mod: Home, srefLink: '/'},
    {mod: Favorites, srefLink: '/favorites'},
    {mod: Detail, srefLink: '/detail'}
];

/*App Component*/
class App extends Component {
    constructor(props) {
        super(props);
    }

    state = ({
        isLogin: false
    });

    redirectTo = () => {
        //console.log(StateService);
    };

    handleScroll = () => {
        if (document.documentElement.scrollTop >= 900) {
            this.props.dispatch(toggleToTopButton('show'));
        } else {
            this.props.dispatch(toggleToTopButton('hide'));
        }
    };

    handleScrollToTop = () => {
        scrollToTop(0).then(resp => {
            // console.log(`scroll end`)
        });
    };

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        // window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        const {classes} = this.props,
            ToTopBtn = () => this.props.toTopBtn && <Button className={classes.globalScrollToTopButton}
                                                            fab
                                                            color="default"
                                                            aria-label="scrollToTop"
                                                            onClick={() => this.handleScrollToTop()}>
                <KeyboardArrowUp />
            </Button>;
        return (
            <Router>
                <div className={classes.contentStyle}>
                    <GlobalDrawer />
                    <ToTopBtn />
                    {
                        routes.map((val, index) =>
                            <Route key={index}
                                   exact={val.srefLink === '/'}
                                   path={val.srefLink}
                                   render={
                                       () => <Bundle load={val.mod}>{Comp => <Comp />}</Bundle>
                                   } />
                        )
                    }
                </div>
            </Router>
        );
    };
}

const mapStateToProps = ({toTopBtn}) => ({toTopBtn});
const newApp = connect(mapStateToProps)(App);
export default withStyles(styles)(newApp);