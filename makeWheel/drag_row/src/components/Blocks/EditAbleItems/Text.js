import React from 'react';
import {component, propTypes} from 'react-decoration';
// import closest from 'utils/closest';
import PropTypes from 'prop-types';
import {convertFromRaw} from 'draft-js';
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
            item: props.item,
            contentState: convertFromRaw({
                'entityMap': {},
                'blocks': [{
                    'key': '637gr',
                    'text': 'Initialized from content state.',
                    'type': 'unstyled',
                    'depth': 0,
                    'inlineStyleRanges': [],
                    'entityRanges': [],
                    'data': {}
                }]
            })
        });
    }

    componentDidMount() {
        // console.log(this.state.item);
        if (!this.state.item.canDrag) {
            // console.log(this.domEditor);
            this.domEditor.focusEditor();
        }
    }

    setDomEditorRef = ref => this.domEditor = ref;

    handleInputChange = (event) => {
        const newVal = event.target.value;
        // console.log(newVal);

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
            this.props.setEditing('open',item.id);
        }
    };

    handleBlur = () => {};

    onContentStateChange = (contentState) => {
        this.setState({
            contentState
        });
    };

    render() {
        // console.log('Text mounted');
        const {editing, contentState} = this.state,
            {item} = this.props,
            {canDrag} = item;
        // console.log(item);
        return <div className='drag_able-text'
                    ref={dom => this.rootDom = dom}
            // suppressContentEditableWarning={true}
            // contentEditable={true}
                    onClick={this.handleFocus}
                    onBlur={this.handleBlur}
                    style={{cursor: canDrag ? 'move' : 'default'}}>
            {!canDrag && <div className='backdrop' onClick={()=>this.props.setEditing('close',item.id)}></div>}
            {/*<p>{item}</p>*/}
            {canDrag ? <p>{item.text}</p> :
                <Editor onContentStateChange={this.onContentStateChange}
                        ref={this.setDomEditorRef} />}
            {/*<textarea type="text" disabled={canDrag} onChange={this.handleInputChange} value={item.text}></textarea>*/}
        </div>;

    }
}