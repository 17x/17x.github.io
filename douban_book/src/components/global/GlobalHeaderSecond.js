/*
* Global second class page header
* This contain back trigger
* page title
* and customize function
* */

import React from 'react';
import {connect} from 'react-redux';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';

import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';

import style from '../style';
import {withStyles} from 'material-ui/styles/index';

const GlobalHeaderSecond = (props) => {
    const {dispatch, classes, title, authenticated, customizeArea} = props;
    //console.log(StateService);
    //console.log(props);
    const back = () => {
        window.history.back();
    };

    return <AppBar position="static" style={{backgroundColor: '#4caf50'}} className={classes.commonHeaderStyle}>
        {/* toolbar always shown */}
        <Toolbar>
            <IconButton className={classes.menuButton}
                        color="contrast"
                        aria-label="Menu"
                        onClick={() => back()}>
                <KeyboardArrowLeft />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
                {title}
            </Typography>
            {customizeArea}
            {/*{
                authenticated ?
                    <IconButton className={classes.menuButton}
                                color="contrast"
                                aria-label="isLogin">
                        <PersonIcon />
                    </IconButton> :
                    <IconButton className={classes.menuButton + ' ' + classes.menuButtonLogin}
                                color="contrast">
                        <AccountCircle />
                    </IconButton>
            }*/}
        </Toolbar>
    </AppBar>;
};

const mapStateToProps = (state, ownProps) => state;

const GlobalHeaderSecondApp = connect(mapStateToProps)(GlobalHeaderSecond);

export default withStyles(style)(GlobalHeaderSecondApp);
