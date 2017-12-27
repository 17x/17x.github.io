import React, {Component} from 'react';
import Typography from 'material-ui/Typography';

import ModelA from './models/ModelA';
import ModelB from './models/ModelB';
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
            <Typography type='title' color='inherit'>内容区模板 <small>拖动下面的模板到左边的视图区域</small></Typography>
            <div className='editArea'>
                <div className='editArea-content-models'>
                    <ModelA />
                    <ModelB />
                </div>
            </div>
        </div>;
    }
}

export default EditArea;