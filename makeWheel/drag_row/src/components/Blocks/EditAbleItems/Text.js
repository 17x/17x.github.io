import React from 'react';
import {component, autobind} from 'react-decoration';

@component
export default class Text {
    state = ({});

    @autobind
    startEdit() {
        console.log(this.rootDom);
    }

    render() {
        const {item} = this.props;
        return <div ref={dom => this.rootDom = dom}>
            <p contentEditable="true" onClick={this.startEdit}>{item.text}</p>
        </div>;
    }
}