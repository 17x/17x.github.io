import React, {Component} from 'react';
import Typography from 'material-ui/Typography';
import {connect} from 'react-redux';

import Square from './models/Square';
import Rectangle from './models/Rectangle';
import Carousel from './models/Carousel';
import TextField from './models/TextField';
import ProductList from './models/ProductList';

import './style.scss';

class EditArea extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className='demoArea-wrap'>
            <Typography type='title' color='inherit'>内容模板 <small>拖动模板到右边</small></Typography>
            <div className='demoArea'>
                <div className='demoArea-content-models'>
                    <Square />
                    <Rectangle />
                    <Carousel />
                    <TextField />
                </div>
            </div>
        </div>;
    }
}

const mapStateToProps = ({viewportList}) => ({viewportList});
let EditAreaComp = connect(mapStateToProps)(EditArea);

export default EditAreaComp;