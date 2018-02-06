import React from 'react';
import {connect} from 'react-redux';

import Model from './Model';

const basicStyle = ({
    display: 'block',
    width: 100,
    height: 100,
    border: '2px solid #dfdfdf',
    backgroundColor: '#fff',
    cursor: 'move',
    zIndex: 1000
});

class Square extends Model {
    constructor(props) {
        super(props);
    }

    state = ({
        modelType: 'square',
        classList: [],
        //应用样式
        applyStyle: {
            ...basicStyle,
            width: '31.25%'
        },
        // 显示样式
        styles: {
            ...basicStyle,
            lineHeight: '100px'
        },
        additionProps: {
            url: '',
            subImg: '',
            subImgStretch: false
        }
    });

    componentDidMount() {}

    render() {
        return <a ref={model => this.domRef = model}
                  data-pseudo-title='模板-正方形'
                  style={this.state.styles}
                  onMouseDown={(e) => this.handleMouseDown(e)}
                  onClick={(e) => {e.preventDefault();}}
                  className={this.state.classList.join(' ')}>
        </a>;
    }
}

const mapStateToProps = ({viewportList}) => ({viewportList});
let SquareComp = connect(mapStateToProps)(Square);

export default SquareComp;