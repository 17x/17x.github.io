import React, {Component} from 'react';
import List from 'material-ui/List';
import {connect} from 'react-redux';
import {openEditModal} from 'actions';

import './style.scss';
import PreviewItem from './PreviewCard';
import PreviewContent from './PreviewContent';
import {replaceViewPortItem, replaceFooterItem} from 'actions';

let _timer = null;

class Preview extends Component {
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
        clearTimeout(_timer);
        this.setState({
            showPreview: true,
            id
        });
    };

    handleHidePreview = () => {
        //console.log('handleHidePreview');
        _timer = setTimeout(() => {
            this.setState({
                showPreview: false,
                id: NaN
            });
        }, 100);
    };

    handleApply = id => {
        const template = this.props.templateList.filter(val => val.id === id)[0];
        //console.log(template);
        this.props.dispatch(replaceViewPortItem(template.template.viewportList));
        this.props.dispatch(replaceFooterItem(template.template.footList));
    };

    render() {
        const {templateList} = this.props,
            {showPreview, id} = this.state,
            template = templateList.filter(val => val.id === id)[0];
        //console.log(showPreview,template);

        return <div className='preview-wrap'>
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
            {showPreview && <PreviewContent template={template.template} />}
        </div>;
    }
}

const mapStateToProps = ({templateList}) => ({templateList});
let PreviewApp = connect(mapStateToProps)(Preview);

export default PreviewApp;