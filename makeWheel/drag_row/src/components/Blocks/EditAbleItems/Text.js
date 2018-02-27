import React from 'react';
import {component} from 'react-decoration';
import closest from 'utils/closest';

@component
export default class Text {

    state = ({editing: false});

    startEdit = () => {
        // let closestDom = closest(this.rootDom, '.drag_able-block');
        // closestDom.setAttribute('draggable', false);
    };

    handleFocus = () => {
        let closestDom = closest(this.rootDom, '.drag_able-block');
        // console.log(closestDom);
        closestDom.setAttribute('draggable', 'false');
        this.setState({
            editing: true
        });
    };

    handleBlur = () => {
        // let closestDom = closest(this.rootDom, '.drag_able-block');
        // closestDom.setAttribute('draggable', 'true');
    };

    render() {
        // console.log(this.props.styles);
        const {editing} = this.state;
        console.log(editing);
        const {item} = this.props;
        return <div className='drag_able-text'
                    ref={dom => this.rootDom = dom}
                    suppressContentEditableWarning={true}
                    contentEditable={true}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    style={{cursor: editing ? 'text' : 'normal'}}
            //            onClick={this.startEdit}
        >{item.text}
        </div>;
    }
}