import React, {Component} from 'react';

import {HashRouter as Router, Route} from 'react-router-dom';

import {connect} from 'react-redux';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import KeyboardArrowUp from 'material-ui-icons/KeyboardArrowUp';

import '../assets/styles/public.scss';
import styles from './style';

import Bundle from './global/Bundle';
import {toggleToTopButton} from '../actions';
import scrollToTop from '../assets/util/scrollToTop';
import PrivateRoute from './PrivateRoute/privateRoute';
import GlobalDrawer from './global/GlobalDrawer';
import routes from './routes';

/*axios defaults*/
/*axios.defaults.baseURL = 'http://192.168.1.13:80/ak-sw-tg/pages/m/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = false;*/

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
        const {classes, authenticated} = this.props,
            ToTopBtn = () => (
                this.props.toTopBtn &&
                <Button className={classes.globalScrollToTopButton}
                        fab
                        color="default"
                        aria-label="scrollToTop"
                        onClick={() => this.handleScrollToTop()}>
                    <KeyboardArrowUp />
                </Button>
            );
        return (
            <Router>
                <div className={classes.contentStyle}>
                    <GlobalDrawer />
                    <ToTopBtn />
                    {
                        routes.map((val, index) =>
                            val.needAuth
                                ? <PrivateRoute key={index}
                                                path={val.srefLink}
                                                component={val.mod} />
                                : <Route key={index}
                                         exact={val.srefLink === '/'}
                                         path={val.srefLink}
                                         render={val.mod} />
                        )
                    }
                </div>
            </Router>
        );
    };
}

const mapStateToProps = ({toTopBtn, authenticated}) => ({toTopBtn, authenticated});
const newApp = connect(mapStateToProps)(App);
export default withStyles(styles)(newApp);