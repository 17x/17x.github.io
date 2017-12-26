import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import AddIcon from 'material-ui-icons/Add';

import './style.scss';
import getDom from '../../assets/util/getDom';

import EditModal from '../editModal';
import ContentItem from '../models/ContentItem';
import FooterItem from '../models/FooterItem';
import AppHeader from '../Header';
import {replaceViewPortItem, openEditModal, replaceFooterItem} from 'actions';

let _timerForAddBtn = null;

class Viewport extends Component {
    constructor(props) {
        super(props);
    }

    state = ({});

    handleFooterHover = () => {
        if (this.props.footList.length >= 4) return;
        const dom = getDom('.viewport-footer-add-btn-wrap')[0];
        // console.log(dom);
        dom.classList.add('active');

        _timerForAddBtn = setTimeout(() => {
            dom.classList.remove('active');
        }, 2000);
    };

    handleAddBtnEvent = () => {
        const dom = getDom('.viewport-footer-add-btn-wrap')[0];
        switch (event.type) {
            case 'react-mouseenter':
                dom.classList.add('active');
                clearTimeout(_timerForAddBtn);
                break;
            case 'react-mouseleave':
                _timerForAddBtn = setTimeout(() => {
                    dom.classList.remove('active');
                }, 500);
                break;
            case 'react-click':
                this.props.dispatch(openEditModal('add', 'foot'));
                dom.classList.remove('active');
                break;
            default:
                throw new Error('unknown event type');
        }
    };

    componentDidMount() {
        axios.get('/mock/index.json')
            .then(resp => {
                //console.log(resp.data);
                this.props.dispatch(replaceViewPortItem(resp.data.contentItems));
                this.props.dispatch(replaceFooterItem(resp.data.footerItems));
            });
    }

    render() {
        const footWidth = (100 / this.props.footList.length) + '%',
            {viewportList, axisList} = this.props;
        console.log(axisList);
        return <div className='viewport-wrap'>
            <div className='viewport'>
                <AppHeader />
                <div className={'viewport-content-wrap' + (this.props.isDragging ? ' active' : '')}>
                    <div className={'viewport-content'}>
                        {viewportList.map((val, index) =>
                            <ContentItem key={index} attr={val} />
                        )}
                    </div>
                    <div className={'noticeMask' + (this.props.mouseInViewport ? ' active' : '')}></div>
                    <div className='viewport-axis-wrap'>
                        {axisList.map((val, index) => <div key={index}
                                                           style={val.axisType === 'x' ? {left: val.pixel} : {top: val.pixel}}
                                                           className={
                                                               ['viewport-axis-item', val.axisType === 'x' ? 'axis-x' : 'axis-y'].join(' ')
                                                           }>

                            </div>
                        )}
                    </div>
                </div>
                <div className='viewport-footer' onMouseEnter={() => this.handleFooterHover()}>
                    {
                        this.props.footList.length < 4 &&
                        <Tooltip title='添加导航项'
                                 placement='left'
                                 className='viewport-footer-add-btn-wrap'
                                 onMouseEnter={() => this.handleAddBtnEvent()}
                                 onMouseLeave={() => this.handleAddBtnEvent()}
                                 children={
                                     <IconButton
                                         onClick={() => this.handleAddBtnEvent()}
                                         className='viewport-footer-add-btn'>
                                         <AddIcon />
                                     </IconButton>
                                 }>
                        </Tooltip>}
                    {this.props.footList.map((val, index) =>
                        <FooterItem key={index} attr={{...val, width: footWidth}} />
                    )}
                </div>
                <EditModal />
            </div>
        </div>;
    }
}

const mapStateToProps = ({isDragging, viewportList, footList, mouseInViewport, axisList}) => ({
    isDragging,
    viewportList,
    footList,
    mouseInViewport,
    axisList
});

let myViewport = connect(mapStateToProps)(Viewport);

export default myViewport;