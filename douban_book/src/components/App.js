import React, {Component} from 'react';
import {hashLocationPlugin, UIRouter, UIView} from '@uirouter/react';
import {connect} from 'react-redux';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import KeyboardArrowUp from 'material-ui-icons/KeyboardArrowUp';

import GlobalDrawer from './global/GlobalDrawer';

import '../assets/styles/public.scss';
import styles from './style';

import scrollToTop from '../assets/util/scrollToTop';

import homeState from './home/route';
import favoriteState from './favorites/route';
import detailState from './detail/route';

import {toggleToTopButton} from '../actions';
//import Promise from 'babel-plugin-es6-promise';

/*axios defaults*/
/*axios.defaults.baseURL = 'http://192.168.1.13:80/ak-sw-tg/pages/m/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = false;*/

/* route configs*/
let states = [].concat(homeState, favoriteState, detailState);

const configRouter = router => {
    //console.log(router.urlService.listen());
    // console.log(router.stateService.current);
    // default to home
    router.urlRouter.otherwise('/home');
    //transition watch
    router.transitionService.onEnter({}, (trans, state) => {
        //console.log(trans, state);
    });
};

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
            <UIRouter plugins={[hashLocationPlugin]}
                      states={states}
                      config={configRouter}>
                <div className={classes.contentStyle}>
                    <GlobalDrawer />
                    <ToTopBtn />
                    <UIView />
                </div>
            </UIRouter>
        );
    };
}

const mapStateToProps = ({toTopBtn}) => ({toTopBtn});
const newApp = connect(mapStateToProps)(App);
export default withStyles(styles)(newApp);