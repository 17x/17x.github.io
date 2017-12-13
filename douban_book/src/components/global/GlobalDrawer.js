/*
* Global side navigator
* Control by redux
* */

import React from 'react';
import Drawer from 'material-ui/Drawer';
import {connect} from 'react-redux';

import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import HomeIcon from 'material-ui-icons/Home';
import FavoriteIcon from 'material-ui-icons/Favorite';
import CommentIcon from 'material-ui-icons/Comment';
import SettingsIcon from 'material-ui-icons/Settings';
import InfoIcon from 'material-ui-icons/Info';
import {toggleDrawer} from '../../actions';

import {NavLink} from 'react-router-dom';

/* drawerList */
const drawerList = [
        {name: 'Home', srefLink: '/', icon: <HomeIcon />},
        {name: 'Favorites', srefLink: 'favorites', icon: <FavoriteIcon />},
        {name: 'Book Comments', srefLink: 'bookComments', icon: <CommentIcon />},
        {name: 'Setting', srefLink: 'setting', icon: <SettingsIcon />},
        {name: 'About', srefLink: 'about', icon: <InfoIcon />}
    ],
    drawerActiveStyle = {
        backgroundColor: '#e0e0e0', display: 'block'
    };

let GlobalDrawer = ({dispatch, drawer}) =>
    <Drawer open={drawer}
            elevation={0}
            onRequestClose={() => dispatch(toggleDrawer())}>
        <List>
            {drawerList.map((val, index) => (
                <NavLink activeStyle={drawerActiveStyle} key={index} to={val.srefLink}>
                    <ListItem button onClick={() => setTimeout(() => dispatch(toggleDrawer()), 100)}>
                        <ListItemIcon>{val.icon}</ListItemIcon>
                        <ListItemText primary={val.name} />
                    </ListItem>
                </NavLink>
            ))}
        </List>
    </Drawer>;

const mapStateToProps = (state) => ({drawer: state.drawer});

GlobalDrawer = connect(mapStateToProps)(GlobalDrawer);

export default GlobalDrawer;