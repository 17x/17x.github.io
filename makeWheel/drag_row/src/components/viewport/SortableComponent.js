import React, {Component} from 'react';

// import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
// slade with dnd
const SortableItem = SortableElement(({value}) =>
    <li>{value.id}</li>
);

const SortableList = SortableContainer(({items}) => {
    console.log('items', items);

    return (
        <ul>slade
            {items.map((value, index) => (
                <SortableItem key={`item-${index}`} index={index} value={value} />
            ))}
        </ul>
    );
});

class SortableComponent extends Component {
    constructor(props) {
        super(props);
    }

    state = {items: this.props.items};

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
            items: arrayMove(this.state.items, oldIndex, newIndex)
        });
    };

    render() {
        return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />;
    }
}

export default SortableComponent;