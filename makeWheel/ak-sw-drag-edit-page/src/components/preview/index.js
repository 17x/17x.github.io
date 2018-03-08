import React, {Component} from 'react';
import List from 'material-ui/List';
import {connect} from 'react-redux';
import {openEditModal} from 'actions';
import Typography from 'material-ui/Typography';

import './style.scss';
import PreviewItem from './PreviewCard';
import PreviewContent from './PreviewContent';
import {replaceViewPortItem, replaceFooterItem} from 'actions';

let _timer = null;
const mapStateToProps = ({templateList}) => ({templateList});
@connect(mapStateToProps)
export default class Preview extends Component {
    constructor(props) {
        super(props);
    }

    state = ({
        showPreview: false
    });

    handleClick = id => {
        this.props.dispatch(openEditModal('edit', 'template', id));
    };

    handlePreview = id => {
        console.log(id);
        clearTimeout(_timer);
        this.setState({
            showPreview: true,
            id
        });
    };

    handleHidePreview = () => {
        //console.log('handleHidePreview');
        this.setState({
            showPreview: false,
            id: NaN
        });
    };

    handleApply = id => {
        const {templateList, dispatch} = this.props,
            data = templateList.filter(val => val.id === id)[0].data;

        console.log(templateList, id, data);
        dispatch(replaceViewPortItem(data.viewportList));
        dispatch(replaceFooterItem(data.footList));
    };

    render() {
        const {templateList} = this.props,
            {showPreview, id} = this.state,
            previewTemplate = templateList.filter(val => val.id === id)[0];

        // console.log(templateList);

        //console.log(showPreview,template);

        return <div className='preview-wrap'>
            <Typography type='title' color='inherit'>
                <p>页面模板</p>
                <small>编辑或应用</small>
            </Typography>
            <List style={{overflowX: 'hidden', overflowY: 'auto', height: '100%'}}>
                {
                    templateList.map((val, index) => <PreviewItem key={index}
                                                                  item={val}
                                                                  onApply={this.handleApply}
                                                                  onPreview={this.handlePreview}
                                                                  onClick={this.handleClick}
                                                                  onOut={this.handleHidePreview} />
                    )
                }
            </List>
            {showPreview && <PreviewContent template={previewTemplate} />}
        </div>;
    }
}