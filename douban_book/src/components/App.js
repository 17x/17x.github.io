import React, {Component} from 'react';
import {UIRouter, UIView, hashLocationPlugin, UISref, UISrefActive, StateService} from '@uirouter/react';
import axios from 'axios';
import {connect} from 'react-redux';

/*material-ui*/
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';

import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui-icons/Menu';
import PersonIcon from 'material-ui-icons/Person';

import {green} from 'material-ui/colors';

import GlobalDrawer from './global/GlobalDrawer';

/*axios defaults*/
axios.defaults.baseURL = 'http://192.168.1.13:80/ak-sw-tg/pages/m/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;

/* route configs*/
import homeState from './home/route';
import favoriteState from './favorites/route';
import {toggleDrawer} from '../actions';

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
        pageTitle: 1,
        isLogin: false
    });

    redirectTo = () => {
        console.log(StateService);
    };

    render() {
        // console.log(this.props.drawer);
        const {classes} = this.props;
        return (
            <UIRouter plugins={[hashLocationPlugin]}
                      states={states}
                      config={configRouter}>
                <div>
                    <AppBar position="static" style={{backgroundColor: '#4caf50'}}>
                        {/* toolbar always shown */}
                        <Toolbar>
                            <IconButton className={classes.menuButton}
                                        color="contrast"
                                        aria-label="Menu"
                                        onClick={() => this.props.dispatch(toggleDrawer())}>
                                <MenuIcon />
                            </IconButton>
                            <Typography type="title" color="inherit" className={classes.flex}>
                                {this.state.pageTitle}
                            </Typography>
                            {
                                this.state.isLogin ?
                                    <IconButton className={classes.menuButton}
                                                color="contrast"
                                                aria-label="person">
                                        <PersonIcon />
                                    </IconButton> :
                                    <Button color="contrast">Login</Button>
                            }
                        </Toolbar>
                    </AppBar>
                    {/* side Drawer show when need */}
                    <GlobalDrawer classes={classes} />
                    <UIView />
                </div>
            </UIRouter>
        );
    };
}

const newApp = connect()(App);
export default withStyles(styles)(newApp);