import React, {Component} from 'react';
import {hashLocationPlugin, StateService, UIRouter, UIView} from '@uirouter/react';
import {connect} from 'react-redux';

import {withStyles} from 'material-ui/styles';

import GlobalDrawer from './global/GlobalDrawer';
import GlobalHeader from './global/GlobalHeader';

import '../assets/styles/public.scss';
import styles from './style';

import homeState from './home/route';
import favoriteState from './favorites/route';

/*axios defaults*/
/*axios.defaults.baseURL = 'http://192.168.1.13:80/ak-sw-tg/pages/m/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = false;*/

/* route configs*/
let states = [].concat(homeState, favoriteState);

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
        console.log(StateService);
    };

    componentDidMount() {

    }

    render() {
        const {classes} = this.props;
        return (
            <UIRouter plugins={[hashLocationPlugin]}
                      states={states}
                      config={configRouter}>
                <div className={classes.contentStyle}>
                    <GlobalHeader classes={classes} />
                    <GlobalDrawer />
                    <UIView />
                </div>
            </UIRouter>
        );
    };
}

const newApp = connect()(App);
export default withStyles(styles)(newApp);