import React, {Component} from 'react';
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

class Carousel extends Model {
    constructor(props) {
        super(props);
    }

    state = ({
        modelType: 'carousel',
        classList: [],
        //应用样式
        applyStyle: {
            ...basicStyle,
            width: '100%'
        },
        // 显示样式
        styles: {
            ...basicStyle
        }
    });

    componentDidMount() {}

    render() {
        return <a ref={model => this.domRef = model}
                  data-pseudo-title='模板-轮播图'
                  style={this.state.styles}
                  onMouseDown={(e) => this.handleMouseDown(e)}
                  onClick={(e) => {e.preventDefault();}}
                  className={this.state.classList.join(' ')}>
        </a>;
    }
}

const mapStateToProps = ({viewportList}) => ({viewportList});
let CarouselComp = connect(mapStateToProps)(Carousel);

export default CarouselComp;