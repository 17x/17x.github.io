import React from 'react';
import {DragSource} from 'react-dnd';

// Drag sources and drop targets only interact
// if they have the same string type.
// You want to keep types in a separate file with
// the rest of your app's constants.
const Types = {
    CARD: 'card'
};

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const cardSource = {
    beginDrag(props) {
        // Return the data describing the dragged item
        return {id: props.id};
    },

    endDrag(props, monitor, component) {
        if (!monitor.didDrop()) {
            return;
        }

        // When dropped on a compatible target, do something
        const item = monitor.getItem();
        const dropResult = monitor.getDropResult();
        CardActions.moveCardToList(item.id, dropResult.listId);
    }
};

// Use the decorator syntax
@DragSource(Types.CARD, cardSource, (connect, monitor) => ({
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
}))

export default class Card extends React.Component {
    render() {
        // Your component receives its own props as usual
        const {id} = this.props;

        // These two props are injected by React DnD,
        // as defined by your `collect` function above:
        const {isDragging, connectDragSource} = this.props;

        return connectDragSource(
            <div>
                I am a draggable card number {id}
                {isDragging && ' (and I am being dragged now)'}
            </div>
        );
    }
}