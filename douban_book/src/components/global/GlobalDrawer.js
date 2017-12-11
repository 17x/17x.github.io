/*
* Global side navigator
* Control by redux
* */

import React from 'react';
import Drawer from 'material-ui/Drawer';
import {UISref, UISrefActive} from '@uirouter/react';
import {connect} from 'react-redux';

import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import HomeIcon from 'material-ui-icons/Home';
import FavoriteIcon from 'material-ui-icons/Favorite';
import CommentIcon from 'material-ui-icons/Comment';
import SettingsIcon from 'material-ui-icons/Settings';
import InfoIcon from 'material-ui-icons/Info';
import {toggleDrawer} from '../../actions';

/* drawerList */
const drawerList = [
    {name: 'Home', srefLink: 'home', icon: <HomeIcon />},
    {name: 'Favorites', srefLink: 'favorites', icon: <FavoriteIcon />},
    {name: 'Book Comments', srefLink: 'bookComments', icon: <CommentIcon />},
    {name: 'Setting', srefLink: 'setting', icon: <SettingsIcon />},
    {name: 'About', srefLink: 'about', icon: <InfoIcon />}
];

let GlobalDrawer = ({dispatch, drawer}) =>
    <Drawer open={drawer}
            elevation={0}
            onRequestClose={() => dispatch(toggleDrawer())}>
        <List>
            {drawerList.map((val, index) => (
                <UISrefActive class={'avtive'} key={index}>
                    <UISref to={val.srefLink}>
                        <div>
                            <ListItem button onClick={() => setTimeout(() => dispatch(toggleDrawer()), 100)}>
                                <ListItemIcon>{val.icon}</ListItemIcon>
                                <ListItemText primary={val.name} />
                            </ListItem>
                        </div>
                    </UISref>
                </UISrefActive>
            ))}
        </List>
    </Drawer>;

const mapStateToProps = (state) => ({drawer: state.drawer});
GlobalDrawer = connect(mapStateToProps)(GlobalDrawer);

export default GlobalDrawer;