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

class ModelB extends Model {
    constructor(props) {
        super(props);
    }

    state = ({
        modelType: 'modelB',
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
                  data-pseudo-title='模板-矩形'
                  style={this.state.styles}
                  onMouseDown={(e) => this.handleMouseDown(e)}
                  onClick={(e) => {e.preventDefault();}}
                  className={this.state.classList.join(' ')}>
        </a>;
    }
}

const mapStateToProps = ({viewportList}) => ({viewportList});
let myModel = connect(mapStateToProps)(ModelB);

export default myModel;