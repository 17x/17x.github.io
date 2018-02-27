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
        const hasProductList = this.props.viewportList.find(val => val.modelType === 'productList');

        return <div className='editArea-wrap'>
            <Typography type='title' color='inherit'>
                <p>内容模板</p>
                <small>拖动下面的模板到左边的视图区域</small>
            </Typography>
            <div className='editArea'>
                <div className='editArea-content-models'>
                    <Square />
                    <Rectangle />
                    <Carousel />
                    <TextField />
                    {
                        !hasProductList &&
                        <div>
                            <small style={{
                                float: 'left',
                                display: 'block',
                                width: '100%',
                                marginTop: 20,
                                lineHeight: '50px',
                                borderBottom: '1px solid #dfdfdf'
                            }}>产品列表
                            </small>
                            <ProductList />
                        </div>}
                </div>
            </div>
        </div>;
    }
}

const mapStateToProps = ({viewportList}) => ({viewportList});
let EditAreaComp = connect(mapStateToProps)(EditArea);

export default EditAreaComp;