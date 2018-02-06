import React from 'react';
import {connect} from 'react-redux';

import Model from './Model';

const basicStyle = ({
    display: 'block',
    width: 320,
    height: 160,
    border: '2px solid #dfdfdf',
    cursor: 'move',
    backgroundColor: '#fff',
    zIndex: 1000
});

class ProductList extends Model {
    constructor(props) {
        super(props);
    }

    state = ({
        modelType: 'productList',
        classList: [],
        //应用样式
        applyStyle: {
            ...basicStyle,
            width: '100%',
            left: 0
        },
        // 显示样式
        styles: {
            ...basicStyle,
            lineHeight: '160px'
        },
        additionProps: {
            title: '',
            productCount: '',
            middleId: '',
            smallId: '',
            brandId: '',
            miniTransactionPrice: '',
            maxTransactionPrice: ''
        }
    });

    componentDidMount() {}

    render() {
        return <a ref={model => this.domRef = model}
                  data-pseudo-title='模板-产品列表'
                  style={this.state.styles}
                  onMouseDown={(e) => this.handleMouseDown(e)}
                  onClick={(e) => {e.preventDefault();}}
                  className={this.state.classList.join(' ')}>
        </a>;
    }
}

const mapStateToProps = ({viewportList}) => ({viewportList});
let ProductListComp = connect(mapStateToProps)(ProductList);

export default ProductListComp;