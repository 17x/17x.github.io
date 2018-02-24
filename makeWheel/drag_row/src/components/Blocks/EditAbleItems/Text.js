import React from 'react';
import {component, autobind} from 'react-decoration';
import closest from 'utils/closest';

@component
export default class Text {
    state = ({});

    @autobind
    startEdit() {
        let closestDom = closest(this.rootDom, '.drag_able-block');
        // closestDom.setAttribute('draggable', false);
    }

    render() {
        const {item} = this.props;
        return <div ref={dom => this.rootDom = dom} >
            <p suppressContentEditableWarning={true} contentEditable="true" onClick={this.startEdit}>{item.text}</p>
        </div>;
    }
}