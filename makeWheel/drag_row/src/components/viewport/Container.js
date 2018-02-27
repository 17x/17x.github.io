import React, {Component} from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import {DropTarget} from 'react-dnd';
import {autobind} from 'react-decoration';
import DragAbleItem from '../Blocks/DragAbleItem';
import {typeView} from '../Blocks/ItemTypes';
import blocks from '../Blocks';

const style = {
    width: 320
};

const blockTarget = {
    drop(item) {
        // this.removeBlock(item.id);
    }
};

@DropTarget(typeView.BLOCK, blockTarget, connect => ({
    connectDropTarget: connect.dropTarget()
}))
export default class Container extends Component {
    static propTypes = {
        connectDropTarget: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
    }

    state = ({
        items: [
            {
                id: 1,
                uniqueBlockKey: 'text-1',
                text: 'Write a cool JS library'
            },
            {
                id: 2,
                uniqueBlockKey: 'text-1',
                text: 'Make it generic enough'
            },
            {
                id: 3,
                uniqueBlockKey: 'text-1',
                text: 'Write README'
            },
            {
                id: 4,
                uniqueBlockKey: 'text-1',
                text: 'Create some examples'
            },
            {
                id: 5,
                uniqueBlockKey: 'text-1',
                text: 'Spam in Twitter and IRC to promote it'
            },
            {
                id: 6,
                uniqueBlockKey: 'text-1',
                text: '???'
            },
            {
                id: 7,
                uniqueBlockKey: 'text-1',
                text: 'PROFIT'
            }
        ]
    });

    @autobind
    moveBlock(id, atIndex) {
        const {item, index} = this.findBlock(id);
        this.setState(
            update(this.state, {
                items: {
                    $splice: [[index, 1], [atIndex, 0, item]]
                }
            })
        );
    }

    @autobind
    findBlock(id) {
        const {items} = this.state;
        const item = items.filter(c => c.id === id)[0];

        return {
            item,
            index: items.indexOf(item)
        };
    }

    render() {
        const {connectDropTarget} = this.props;
        let {items} = this.state;
        const mergedBlock = [];
        blocks.map(val => {mergedBlock.push(...val.items);});

        // console.log('blocks', mergedBlock);
        items = items.map(item => {
            let newItem = null;
            mergedBlock.map(block => {
                if (item.uniqueBlockKey === block.uniqueBlockKey) {
                    newItem = {
                        ...item,
                        component: block.component
                    };
                }
            });
            return newItem;
        });
        // console.log('items', items);
        return connectDropTarget(
            <div style={style} className='viewport-content'>
                {items.map(item => (
                    <DragAbleItem key={item.id}
                                  position={typeView.BLOCK}
                                  id={item.id}
                                  text={item.text}
                                  canDrag={item.canDrag}
                        // removeBlock={this.removeBlock}
                                  moveBlock={this.moveBlock}
                                  findBlock={this.findBlock}>
                        {item.component('view', item)}
                    </DragAbleItem>
                ))}
            </div>
        );
    }
}