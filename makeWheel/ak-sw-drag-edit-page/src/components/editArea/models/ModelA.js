import React, {Component} from 'react';
import {connect} from 'react-redux';

import Model from './Model';

class ModelA extends Model {
    constructor(props) {
        super(props);
    }

    state = ({
        modelType: 'modelA',
        classList: [],
        styles: {
            display: 'block',
            width: 160,
            height: 160,
            border: '2px solid #dfdfdf',
            cursor: 'move',
            backgroundColor: '#fff',
            zIndex: 99999
        }
    });

    componentDidMount() {}

    render() {
        return <a ref={model => this.domRef = model}
                  style={this.state.styles}
                  onMouseDown={(e) => this.handleMouseDown(e)}
                  onClick={(e) => {e.preventDefault();}}
                  className={this.state.classList.join(' ')}>
            here is models-model-a
        </a>;
    }
}

const mapStateToProps = ({viewportList}) => ({viewportList});
let myModel = connect(mapStateToProps)(ModelA);

export default myModel;