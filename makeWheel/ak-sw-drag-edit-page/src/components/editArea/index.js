import React, {Component} from 'react';
import {Typography} from 'material-ui';

import ModelA from './models/ModelA';
import './style.scss';

class EditArea extends Component {
    constructor(props) {
        super(props);
    }

    handleClickAddFooterItem = () => {
        console.log('handleClickAddFooterItem');
    };

    render() {
        return <div className='editArea-wrap'>
            <div className='editArea'>
                <Typography type='title' color='inherit'>
                    内容区模板
                </Typography>
                <div className='editArea-content-models'>
                    {<div>我是模板啊啊啊啊</div>}
                    <ModelA />
                    <ModelA />
                    <ModelA />
                </div>
            </div>
        </div>;
    }
}

export default EditArea;