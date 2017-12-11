import React from 'react';
import GlobalPagingView from '../global/GlobalPagingView';

const Tab2 = (props) => {
    //console.log(props);
    return <div className={props.className}>
        <p>{props.children}</p>
        <GlobalPagingView />
    </div>;
};

export default Tab2;