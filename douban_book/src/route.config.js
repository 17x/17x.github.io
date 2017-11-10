import React, {Component} from 'react';
import {UIRouter, UIView, hashLocationPlugin, UISref, UISrefActive, StateService} from '@uirouter/react';
import axios from 'axios';

// import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui-icons/Menu';
import PersonIcon from 'material-ui-icons/Person';
import HomeIcon from 'material-ui-icons/Home';
import FavoriteIcon from 'material-ui-icons/Favorite';
import CommentIcon from 'material-ui-icons/Comment';
import SettingsIcon from 'material-ui-icons/Settings';
import InfoIcon from 'material-ui-icons/Info';

import {green} from 'material-ui/colors';

/*custom style*/
// import './assets/publicStyle/normalize.scss';
// import './assets/publicStyle/base.scss';
// import './assets/publicStyle/public.scss';

/*axios defaults*/
axios.defaults.baseURL = 'http://192.168.1.13:80/ak-sw-tg/pages/m/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;

/* route configs*/
import homeState from './components/home/route';
import favoriteState from './components/favorites/route';

let states = [];
states = states.concat(homeState,favoriteState);

/*简写成*/
/*let states = [
    import {homeState} from './components/home/route',
    import {favoriteState} from './components/favorites/route'
]*/


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

/* drawerList */
const drawerList = [
    {name: 'Home', srefLink: 'home', icon: <HomeIcon />},
    {name: 'Favorites', srefLink: 'favorites', icon: <FavoriteIcon />},
    {name: 'Book Comments', srefLink: 'bookComments', icon: <CommentIcon />},
    {name: 'Setting', srefLink: 'setting', icon: <SettingsIcon />},
    {name: 'About', srefLink: 'about', icon: <InfoIcon />}
];

/*App Component*/
class App extends Component {
    constructor(props) {
        super(props);
    }

    state = ({
        showDrawer: false,
        pageTitle: 'Home',
        isLogin: false
    });

    toggleDrawer = () => {
        this.setState({
            showDrawer: !this.state.showDrawer
        });
    };

    redirectTo = () => {
        console.log(StateService);
    };

    render() {
        const {classes} = this.props;
        return (
            <UIRouter plugins={[hashLocationPlugin]}
                      states={states}
                      config={configRouter}>
                <div>
                    <AppBar position="static" style={{backgroundColor: '#4caf50'}}>
                        {/* toolbar always shown */}
                        <Toolbar>
                            <IconButton className={classes.menuButton} color="contrast" aria-label="Menu"
                                        onClick={this.toggleDrawer}>
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
                    <Drawer open={this.state.showDrawer} elevation={0} onRequestClose={this.toggleDrawer}>
                        <List>
                            {
                                drawerList.map((val, index) => (
                                    <UISrefActive class={classes.active} key={index}>
                                        <UISref to={val.srefLink}>
                                            <div>
                                                <ListItem button onClick={this.toggleDrawer}>
                                                    <ListItemIcon>{val.icon}</ListItemIcon>
                                                    <ListItemText primary={val.name} />
                                                </ListItem>
                                            </div>
                                        </UISref>
                                    </UISrefActive>
                                ))
                            }
                        </List>
                    </Drawer>
                    <UIView />
                </div>
            </UIRouter>
        );
    };
}

export default withStyles(styles)(App);