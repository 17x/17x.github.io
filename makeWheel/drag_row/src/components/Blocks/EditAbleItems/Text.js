import React, {Component} from 'react';
import {propTypes} from 'react-decoration';
// import closest from 'utils/closest';
import PropTypes from 'prop-types';
import {convertFromRaw} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import on from 'utils/on';
import off from 'utils/on';

@propTypes({
    position: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired,
    setEditing: PropTypes.func.isRequired
})
export default class Text extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            item: props.item,
            contentState: props.item.editData
        });
    }

    static handleSelectText(event) {
        event.stopPropagation();
        return false;
    }

    componentWillUnmount() {
        // console.log(this.domRef);
    }

    //加载完成后判断是否处于编辑状态
    componentDidMount() {
        // console.log(this.domRef);
        // on(this.domRef, 'click', this.handleSelectText, true);
        // on(this.domRef, 'selectstart', this.handleSelectText, true);

        const {canDrag, editing} = this.state.item;

        if (!canDrag && editing) {
            //调用内置方法启动编辑
            this.domEditor.focusEditor();
        }
    }

    setDomEditorRef = ref => this.domEditor = ref;

    handleFocus = () => {
        console.log('handleFocus ');
        const {item} = this.state;

        //不处于编辑状态
        if (item.canDrag) {
            // console.log('handleFocus');
            // let closestDom = closest(this.rootDom, '.drag_able-block');
            // closestDom.setAttribute('draggable', 'false');
            this.props.setEditing('open', item.id);
        }
    };

    handleBlur = () => {
        const {item, contentState} = this.state;

        console.log(
            // stateToHTML(contentState.getCurrentContent())
        );

        this.props.setEditing('close', item.id);
    };

    onContentStateChange = contentState => this.setState({contentState});

    render() {
        // console.log('Text mounted');
        const {contentState} = this.state,
            {item} = this.props,
            {canDrag, editing} = item;

        return <div className={['drag_able-text', editing ? 'editing' : ''].join(' ')}
                    ref={dom => this.domRef = dom}
                    onClick={this.handleFocus}
            // onBlur={this.handleBlur}
                    style={{
                        border: editing ? '1px dashed #dfdfdf' : 'none'
                    }}>
            {!canDrag && <div className='backdrop' onClick={this.handleBlur}></div>}
            <Editor onContentStateChange={this.onContentStateChange}
                    toolbarHidden={canDrag && !editing}
                    initialContentState={contentState}
                // onClick={this.handleFocus}
                    readOnly={!editing}
                    onBlur={this.handleBlur}
                    ref={this.setDomEditorRef} />
        </div>;

    }
}