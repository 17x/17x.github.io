import React, {Component} from 'react';
import Typography from 'material-ui/Typography';
import {connect} from 'react-redux';

import './style.scss';
import Block from '../Global/Block';
import {typeDemo} from '../Global/ItemTypes';

class EditArea extends Component {
    constructor(props) {
        super(props);
    }

    state = ({
        blocks: [
            {
                text: 'Write a cool JS library'
            },
            {
                text: 'Make it generic enough'
            },
            {
                text: 'Write README'
            },
            {
                text: 'Create some examples'
            },
            {
                text: 'Spam in Twitter and IRC to promote it'
            },
            {
                text: '???'
            },
            {
                text: 'PROFIT'
            }
        ]
    });

    render() {
        const {blocks} = this.state;
        return <div className='demoArea-wrap'>
            <Typography type='title' color='inherit'>内容模板 <small>拖动模板到右边</small></Typography>
            <div className='demoArea'>
                <div className='demoArea-content-models'>
                    <h1>DemoArea Container</h1>
                    {blocks.map((block, index) => (
                        <Block
                            type={typeDemo.BLOCK}
                            key={index}
                            id={block.id}
                            text={block.text}
                            moveBlock={this.moveBlock}
                            findBlock={this.findBlock}
                        />
                    ))}
                </div>
            </div>
        </div>;
    }
}

const mapStateToProps = ({viewportList}) => ({viewportList});
let EditAreaComp = connect(mapStateToProps)(EditArea);

export default EditAreaComp;

