import React, {Component} from 'react';
import Typography from 'material-ui/Typography';

import Square from './models/Square';
import Rectangle from './models/Rectangle';
import Carousel from './models/Carousel';
import './style.scss';

class EditArea extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className='editArea-wrap'>
            <Typography type='title' color='inherit'>内容区模板 <small>拖动下面的模板到左边的视图区域</small></Typography>
            <div className='editArea'>
                <div className='editArea-content-models'>
                    <Square />
                    <Rectangle />
                    <Carousel />
                </div>
            </div>
        </div>;
    }
}

export default EditArea;