import React, {Component} from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import {DropTarget} from 'react-dnd';
// import {autobind as bind} from 'react-decoration';
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
        items: []
    });

    componentDidMount() {
        this.setState({
            items: [
                {
                    id: 1,
                    uniqueBlockKey: 'text-1',
                    editData: {
                        'entityMap': {},
                        'blocks': [{
                            'key': '637gr',
                            'text': 'Write a cool JS library',
                            'type': 'unstyled',
                            'depth': 0,
                            'inlineStyleRanges': [],
                            'entityRanges': [],
                            'data': {}
                        }]
                    }
                },
                {
                    id: 2,
                    uniqueBlockKey: 'text-1',
                    editData: {
                        'entityMap': {},
                        'blocks': [{
                            'key': '637gr',
                            'text': 'Make it generic enough',
                            'type': 'unstyled',
                            'depth': 0,
                            'inlineStyleRanges': [],
                            'entityRanges': [],
                            'data': {}
                        }]
                    }
                },
                {
                    id: 3,
                    uniqueBlockKey: 'text-1',
                    editData: {
                        'entityMap': {},
                        'blocks': [{
                            'key': '637gr',
                            'text': 'Write README',
                            'type': 'unstyled',
                            'depth': 0,
                            'inlineStyleRanges': [],
                            'entityRanges': [],
                            'data': {}
                        }]
                    }
                },
                {
                    id: 4,
                    uniqueBlockKey: 'text-1',
                    editData: {
                        'entityMap': {},
                        'blocks': [{
                            'key': '637gr',
                            'text': 'Create some examples',
                            'type': 'unstyled',
                            'depth': 0,
                            'inlineStyleRanges': [],
                            'entityRanges': [],
                            'data': {}
                        }]
                    }
                },
                {
                    id: 5,
                    uniqueBlockKey: 'text-1',
                    editData: {
                        'entityMap': {},
                        'blocks': [{
                            'key': '637gr',
                            'text': 'Spam in Twitter and IRC to promote it',
                            'type': 'unstyled',
                            'depth': 0,
                            'inlineStyleRanges': [],
                            'entityRanges': [],
                            'data': {}
                        }]
                    }
                },
                {
                    id: 6,
                    uniqueBlockKey: 'text-1',
                    editData: {
                        'entityMap': {},
                        'blocks': [{
                            'key': '637gr',
                            'text': '???',
                            'type': 'unstyled',
                            'depth': 0,
                            'inlineStyleRanges': [],
                            'entityRanges': [],
                            'data': {}
                        }]
                    }
                },
                {
                    id: 7,
                    uniqueBlockKey: 'text-1',
                    editData: {
                        'entityMap': {},
                        'blocks': [{
                            'key': '637gr',
                            'text': 'PROFIT',
                            'type': 'unstyled',
                            'depth': 0,
                            'inlineStyleRanges': [],
                            'entityRanges': [],
                            'data': {}
                        }]
                    }
                }
            ].map(val => ({...val, canDrag: true}))
        });

        // console.log('componentDidMount');
    }

    // 在点击了可编辑项目之后设定状态值:不可拖拽与编辑中 , 并重置其他项目的编辑状态
    setEditing = (manipulation, id) => {
        if (manipulation === 'open') {
            const {index} = this.findBlock(id);

            this.setState((preState) => {
                const newState = preState.items.map((val, ind) => {
                    return index === ind
                        ? {...val, canDrag: false, editing: true}
                        : {...val, canDrag: true, editing: false};
                });

                return {items: newState};
            });
        } else if (manipulation === 'close') {
            this.setState((preState) => ({
                items: preState.items.map(val => ({...val, canDrag: true, editing: false}))
            }));
            // console.log(this.state);
        }
    };

    moveBlock = (id, atIndex) => {
        const {item, index} = this.findBlock(id);
        this.setState(
            update(this.state, {
                items: {
                    $splice: [[index, 1], [atIndex, 0, item]]
                }
            })
        );
    };

    findBlock = (id) => {
        const {items} = this.state;
        const item = items.filter(c => c.id === id)[0];

        return {
            item,
            index: items.indexOf(item)
        };
    };

    render() {
        let {connectDropTarget} = this.props,
            {items} = this.state,
            mergedBlock = [],
            Generate = props => {
                return props.item.component({
                    position: typeView.BLOCK,
                    item: props.item,
                    setEditing: this.setEditing
                });
            };

        // console.log('items', items);

        blocks.map(val => {mergedBlock.push(...val.items);});

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
                                  item={item}
                                  setEditing={this.setEditing}
                                  moveBlock={this.moveBlock}
                                  findBlock={this.findBlock}>
                        {/*{item.component('view', item)}*/}
                        <Generate item={item} />
                    </DragAbleItem>
                ))}
            </div>
        );
    }
}