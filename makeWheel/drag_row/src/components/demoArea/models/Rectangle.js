import React from 'react';
import {connect} from 'react-redux';

import Model from './Model';

const basicStyle = ({
    display: 'block',
    width: 320,
    height: 100,
    border: '2px solid #dfdfdf',
    cursor: 'move',
    backgroundColor: '#fff',
    zIndex: 1000
});

class Rectangle extends Model {
    constructor(props) {
        super(props);
    }

    state = ({
        modelType: 'rectangle',
        classList: [],
        //应用样式
        applyStyle: {
            ...basicStyle,
            width: '100%'
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
                  data-pseudo-title='模板-矩形'
                  style={this.state.styles}
                  onMouseDown={(e) => this.handleMouseDown(e)}
                  onClick={(e) => {e.preventDefault();}}
                  className={this.state.classList.join(' ')}>
        </a>;
    }
}

const mapStateToProps = ({viewportList}) => ({viewportList});
let RectangleComp = connect(mapStateToProps)(Rectangle);

export default RectangleComp;