import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DragSource} from 'react-dnd';

import {typeDemo} from '../Global/ItemTypes';

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
    beginDrag(props) {
        return {
            name: props.name
        };
    },

    endDrag(props, monitor) {
        const item = monitor.getItem();
        const dropResult = monitor.getDropResult();
        console.log(item);
        console.log(dropResult);
        /*if (dropResult) {
            alert(`You dropped ${item.name} into ${dropResult.name}!`); // eslint-disable-line no-alert
        }*/
    }
};

@DragSource(typeDemo.BLOCK, boxSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))
export default class DragAbleItems extends Component {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired
    };

    render() {
        console.log(this.props);
        const {isDragging, connectDragSource} = this.props;
        const {name} = this.props;
        const opacity = isDragging ? 0.4 : 1;

        return connectDragSource(<div style={{...style, opacity}}>{name}</div>);
    }
}