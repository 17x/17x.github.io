import React from 'react';
import {component, propTypes} from 'react-decoration';
// import closest from 'utils/closest';
import PropTypes from 'prop-types';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

@propTypes({
    position: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired,
    setEditing: PropTypes.func.isRequired
})
@component
export default class Text {
    constructor(props) {
        // super(props);
        this.state = ({
            item: props.item
        });
    }

    componentDidMount() {
        // console.log(this.state.item);
        if (!this.state.item.canDrag) {
           /* const oInput = this.rootDom.getElementsByTagName('textarea')[0];
            oInput.focus();
            oInput.setSelectionRange(0, oInput.value.length);*/
        }
    }

    handleInputChange = (event) => {
        const newVal = event.target.value;
        console.log(newVal);

        this.setState((preState) => ({
            item: {
                ...preState.item,
                text: newVal
            }
        }));
    };

    handleFocus = () => {
        const {item} = this.state;

        //不处于编辑状态
        if (item.canDrag) {
            // console.log('handleFocus');
            // let closestDom = closest(this.rootDom, '.drag_able-block');
            // closestDom.setAttribute('draggable', 'false');
            this.props.setEditing(item.id);
        }
    };

    handleBlur = () => {};

    render() {
        // console.log('Text mounted');
        const {editing} = this.state,
            {item} = this.props,
            {canDrag} = item;
        return <div className='drag_able-text'
                    ref={dom => this.rootDom = dom}
            // suppressContentEditableWarning={true}
            // contentEditable={true}
                    onClick={this.handleFocus}
                    onBlur={this.handleBlur}
                    style={{cursor: editing ? 'text' : 'normal'}}>
            <Editor toolbarOnFocus={true} />
            {/*<textarea type="text" disabled={canDrag} onChange={this.handleInputChange} value={item.text}></textarea>*/}
        </div>;

    }
}