import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DragSource, DropTarget} from 'react-dnd';

import {typeView} from './ItemTypes';

const style = {
    width: '100%',
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    cursor: 'move',
    float: 'left'
};

const boxSource = {
    beginDrag(props, bbb, ccc) {
        console.log('beginDrag', props, ccc);
        return {
            id: props.id,
            text: props.text
        };
    },

    endDrag(props, monitor) {
        const item = monitor.getItem();
        const dropResult = monitor.getDropResult();
        console.log(item);
        // console.log(dropResult);
        /*if (dropResult) {
            alert(`You dropped ${item.name} into ${dropResult.name}!`); // eslint-disable-line no-alert
        }*/
    }
};

const blockTarget = {
    canDrop() {
        return false;
    },

    hover(props, monitor) {
        console.log(monitor.getItem());
        const {id: draggedId} = monitor.getItem();
        const {id: overId} = props;

        if (draggedId !== overId) {
            const {index: overIndex} = props.findBlock(overId);
            props.moveBlock(draggedId, overIndex);
        }
    }
};

@DropTarget(typeView.BLOCK, blockTarget, connect => ({
    connectDropTarget: connect.dropTarget()
}))
@DragSource(typeView.BLOCK, boxSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))
export default class Block extends Component {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func,
        isDragging: PropTypes.bool.isRequired,
        id: PropTypes.any,
        type: PropTypes.string.isRequired,
        text: PropTypes.string,
        moveBlock: PropTypes.func,
        findBlock: PropTypes.func
    };

    render() {
        if (this.props.type === 'demo') {
            const {isDragging, connectDragSource} = this.props;
            const {name} = this.props;
            const opacity = isDragging ? 0.4 : 1;

            return connectDragSource(<div style={{...style, opacity}}>{name}</div>);
        } else if (this.props.type === 'view') {
            const {
                text,
                isDragging,
                connectDragSource,
                connectDropTarget
            } = this.props;
            const opacity = isDragging ? 0 : 1;

            return connectDragSource(
                connectDropTarget(<div style={{...style, opacity}}>{text}</div>)
            );
        }

    }
}