import React, {Component} from 'react';
import {connect} from 'react-redux';

import Model from './Model';

const basicStyle = ({
    display: 'block',
    width: 160,
    height: 50,
    border: '2px solid #dfdfdf',
    cursor: 'move',
    backgroundColor: '#fff',
    zIndex: 1000
});

class TextField extends Model {
    constructor(props) {
        super(props);
    }

    state = ({
        modelType: 'textField',
        classList: [],
        //应用样式
        applyStyle: {
            ...basicStyle,
            width: '50%',
            textAlign: 'center',
            height: 50,
            lineHeight: 30,
            padding: 10
        },
        // 显示样式
        styles: {
            ...basicStyle,
            lineHeight: '50px'
        },
        additionProps: {
            text: '文本块'
        }
    });

    componentDidMount() {}

    render() {
        return <a ref={model => this.domRef = model}
                  data-pseudo-title='模板-文本'
                  style={this.state.styles}
                  onMouseDown={(e) => this.handleMouseDown(e)}
                  onClick={(e) => {e.preventDefault();}}
                  className={this.state.classList.join(' ')}>
        </a>;
    }
}

const mapStateToProps = ({viewportList}) => ({viewportList});
let TextFieldComp = connect(mapStateToProps)(TextField);

export default TextFieldComp;