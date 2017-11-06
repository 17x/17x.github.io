import React, {Component} from 'react';
import {UIRouter, UIView, hashLocationPlugin} from '@uirouter/react';
import axios from 'axios';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

import {green} from 'material-ui/colors';
//console.log(green)
/*custom style*/
import './assets/publicStyle/normalize.scss';
import './assets/publicStyle/base.scss';
import './assets/publicStyle/public.scss';

/*axios defaults*/
axios.defaults.baseURL = 'http://192.168.1.13:80/ak-sw-tg/pages/m/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;

import homeState from './components/home/route';
// import userState from './components/user/route';

let states = [];
states = states.concat(homeState);

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

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
});

class App extends Component {
    render() {
        const { classes } = this.props;
        return (
            <UIRouter plugins={[hashLocationPlugin]}
                      states={states}
                      config={configRouter}>
                <div>
                    <AppBar position="static" style={{backgroundColor:'#4caf50'}}>
                        <Toolbar>
                            <IconButton className={classes.menuButton} color="contrast" aria-label="Menu">
                                <MenuIcon />
                            </IconButton>
                            <Typography type="title" color="inherit" className={classes.flex}>
                                Title
                            </Typography>
                            <Button color="contrast">Login</Button>
                        </Toolbar>
                    </AppBar>
                    <UIView />
                </div>
            </UIRouter>
        );
    };
}

/*App.propTypes = {
    classes: PropTypes.object.isRequired,
};*/

export default withStyles(styles)(App);