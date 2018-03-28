import React from 'react';
import PropTypes from 'prop-types';
import {DragSource, DropTarget} from 'react-dnd';
import {typeView} from './ItemTypes';
import {component, propTypes, log} from 'react-decoration';

const blockSource = {
        // @log
        beginDrag(props, monitor, component) {
            /*console.log('beginDrag');
            console.log(monitor);
            console.log(component);*/
            return {
                id: props.item.id,
                modelType: props.modelType,
                text: props.item.text
            };
        },

        endDrag(props, monitor) {
            const item = monitor.getItem();
            const dropResult = monitor.getDropResult();
            //console.log(item, dropResult);
            return item;
            //console.log(item);
            // console.log(dropResult);
            /*if (dropResult) {
                alert(`You dropped ${item.name} into ${dropResult.name}!`); // eslint-disable-line no-alert
            }*/
        }/*,
        canDrag: (props) => {
            console.log(props);
            return props.canDrag;
        }*/
    },
    blockTarget = {
        canDrop() {
            return false;
        },

        hover(props, monitor) {
            //console.log('props', props);
            const {id: draggedId} = monitor.getItem();
            const {id: overId} = props.item;

            if (draggedId !== overId) {
                const {index: overIndex} = props.findBlock(overId);
                props.moveBlock(draggedId, overIndex);
            }
        }
    };

@DropTarget(typeView.BLOCK, blockTarget, connect => ({
    connectDropTarget: connect.dropTarget()
}))
@DragSource(typeView.BLOCK, blockSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
    // canDrag: monitor.canDrag()
}))
@propTypes({
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func,
    isDragging: PropTypes.bool.isRequired,
    position: PropTypes.string.isRequired,
    // show in demo does not need id
    // id: PropTypes.any,
    //show in view and modelType is text
    // text: PropTypes.string,
    //show in demo
    // name: PropTypes.string,
    //pass in func use to sort
    moveBlock: PropTypes.func,
    findBlock: PropTypes.func
})
@component
export default class Block {
    state = ({});

    render() {
        let {
                position,
                isDragging,
                children,
                connectDragSource,
                connectDropTarget,
                item
            } = this.props,
            {canDrag} = item,
            opacity = isDragging ? 0.4 : 1;

        // show as demo
        if (position === 'demo') {
            return connectDragSource(<div className='drag_able-block'
                                          style={{
                                              opacity,
                                              // marginBottom: '1.5rem'
                                          }}>{children}</div>);
        }
        // show as element in viewport
        else if (position === 'view') {
            opacity = isDragging ? 0 : 1;
            // console.log(this.props.canDrag);

            if (canDrag) {
                return connectDragSource(
                    connectDropTarget(
                        <div className='drag_able-block' style={{opacity}}>{children}</div>
                    )
                );
            } else {
                return <div className='drag_able-block noDrag' style={{opacity}}>{children}</div>;
            }
        }
    }
}