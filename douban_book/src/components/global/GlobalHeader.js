/*
* Global normal header
* This contain side-navigator's trigger
* page title
* and depend authenticated determine show login-btn or user-set-btn
* */

import React from 'react';
import {connect} from 'react-redux';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import PersonIcon from 'material-ui-icons/Person';
import AccountCircle from 'material-ui-icons/AccountCircle';

import {toggleDrawer} from '../../actions';

import style from '../style';
import {withStyles} from 'material-ui/styles/index';

const GlobalHeader = (props) => {
    const {dispatch, classes, title, authenticated} = props;
    //console.log(classes);
    return <AppBar position="static" style={{backgroundColor: '#4caf50'}} className={classes.commonHeaderStyle}>
        {/* toolbar always shown */}
        <Toolbar>
            <IconButton className={classes.menuButton}
                        color="contrast"
                        aria-label="Menu"
                        onClick={() => dispatch(toggleDrawer())}>
                <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
                {title}
            </Typography>
            {
                authenticated ?
                    <IconButton className={classes.menuButton}
                                color="contrast"
                                aria-label="person">
                        <PersonIcon />
                    </IconButton> :
                    <AccountCircle />
            }
        </Toolbar>
    </AppBar>;
};

const mapStateToProps = (state, ownProps) => state;

const GlobalHeaderApp = connect(mapStateToProps)(GlobalHeader);

export default withStyles(style)(GlobalHeaderApp);
