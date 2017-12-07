import React, {Component} from 'react';
import {UIRouter, UIView, hashLocationPlugin, UISref, UISrefActive, StateService} from '@uirouter/react';
import axios from 'axios';
import {connect} from 'react-redux';

/*material-ui*/
import {withStyles} from 'material-ui/styles';

import GlobalDrawer from './global/GlobalDrawer';
import GlobalHeader from './global/GlobalHeader';

import '../assets/styles/public.scss';

/*axios defaults*/
axios.defaults.baseURL = 'http://192.168.1.13:80/ak-sw-tg/pages/m/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = false;

/* route configs*/
import homeState from './home/route';
import favoriteState from './favorites/route';

let states = [];
states = states.concat(homeState, favoriteState);

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

/*toolbar style*/
const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
        width: '100%'
    },
    flex: {
        flex: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    active: {
        backgroundColor: '#dfdfdf'
    }
});

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

    render() {
        const {classes} = this.props;
        return (
            <UIRouter plugins={[hashLocationPlugin]}
                      states={states}
                      config={configRouter}>
                <div className='content'>
                    <GlobalHeader classes={classes} />
                    {/* side Drawer show when need */}
                    <GlobalDrawer />
                    <UIView />
                </div>
            </UIRouter>
        );
    };
}

const newApp = connect()(App);
export default withStyles(styles)(newApp);