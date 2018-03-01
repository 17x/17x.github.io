import React, {Component} from 'react';
import {connect} from 'react-redux';

import './style.scss';
import DragAbleItem from '../Blocks/DragAbleItem';
import {typeDemo} from '../Blocks/ItemTypes';

import blocks from '../Blocks';

class EditArea extends Component {
    constructor(props) {
        super(props);
    }

    state = ({
        activeIndex: 0,
        demoBlocks: blocks
    });

    tabSwitchHandle(i) {
        //console.log(i);
        this.setState({activeIndex: i});
    }

    render() {
        //console.log(this.state.demoBlocks);
        const demoBlocks = this.state.demoBlocks.map((val, index) => ({
                ...val,
                showSub: index === this.state.activeIndex
            })),
            Generate = props => {
                return props.item.component({
                    position:typeDemo.BLOCK,
                    item: props.item,
                    setEditing: this.setEditing
                });
            };

        return <div className='demoArea-wrap'>
            <h1>内容模板 <small>拖动模板到右边</small></h1>
            <div className='demoArea'>
                <div className='demoArea-content-models'>
                    {
                        demoBlocks.map((block, index) => (
                            <div key={index}>
                                <p onClick={() => this.tabSwitchHandle(index)}>{block.text}</p>
                                {block.showSub && <ul>
                                    {block.items.map((item, index2) => (
                                        <DragAbleItem key={index2}
                                                      position={typeDemo.BLOCK}
                                                      item={item}
                                            /*id={item.id}
                                            name={item.text}
                                            text={item.text}*/>
                                            <Generate item={item} />
                                            {/*{item.component({position: 'demo', item})}*/}
                                        </DragAbleItem>
                                    ))}
                                </ul>}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>;
    }
}

const mapStateToProps = ({viewportList}) => ({viewportList});
let EditAreaComp = connect(mapStateToProps)(EditArea);

export default EditAreaComp;

