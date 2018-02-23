import React, {Component} from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import {DropTarget} from 'react-dnd';

import Block from '../Global/Block';
import {typeView} from '../Global/ItemTypes';

const style = {
    width: 400
};

const blockTarget = {
    drop() {}
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
        blocks: [
            {
                id: 1,
                text: 'Write a cool JS library'
            },
            {
                id: 2,
                text: 'Make it generic enough'
            },
            {
                id: 3,
                text: 'Write README'
            },
            {
                id: 4,
                text: 'Create some examples'
            },
            {
                id: 5,
                text: 'Spam in Twitter and IRC to promote it'
            },
            {
                id: 6,
                text: '???'
            },
            {
                id: 7,
                text: 'PROFIT'
            }
        ]
    });

    moveBlock = (id, atIndex) => {
        const {block, index} = this.findBlock(id);
        this.setState(
            update(this.state, {
                blocks: {
                    $splice: [[index, 1], [atIndex, 0, block]]
                }
            })
        );
    };

    findBlock = (id) => {
        const {blocks} = this.state;
        const block = blocks.filter(c => c.id === id)[0];

        return {
            block,
            index: blocks.indexOf(block)
        };
    };

    render() {
        const {connectDropTarget} = this.props;
        const {blocks} = this.state;

        return connectDropTarget(
            <div style={style} className='viewport-content'>
                {blocks.map((block, index) => (
                    <Block key={index}
                           type={typeView.BLOCK}
                           name={'block.id.toString()'}
                           id={block.id}
                           text={block.text}
                           moveBlock={this.moveBlock}
                           findBlock={this.findBlock} />
                ))}
            </div>
        );
    }
}
