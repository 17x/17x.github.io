import React from 'react';
import {connect} from 'react-redux';

import {deleteViewPortItem} from 'actions';
import iosStatusBar from '../../assets/images/ios-statusbar.png';

let AppHeader = ({dispatch}) => {
    const clearAllItems = () => {
        dispatch(deleteViewPortItem('deleteAll'));
    };
    return <div className='viewport-header'>
        <img src={iosStatusBar} className='viewport-status-bar' />
        <span> &nbsp;</span>
        <h1>TITLE</h1>
        <span onClick={() => clearAllItems()}>清空</span>
    </div>;
};

AppHeader = connect()(AppHeader);

export default AppHeader;