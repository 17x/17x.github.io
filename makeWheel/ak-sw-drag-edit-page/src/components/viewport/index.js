import React, {Component} from 'react';
import axios from 'axios';
import {IconButton, Tooltip} from 'material-ui';
import AddIcon from 'material-ui-icons/Add';
import {connect} from 'react-redux';

import './style.scss';
import EditModal from '../editModal';
import ContentItem from '../models/ContentItem';
import AppHeader from '../Header';
import {changeViewPortItem, openEditModal} from '../../actions';

let _timerForAddBtn = null;

class Viewport extends Component {
    constructor(props) {
        super(props);
    }

    state = ({
        showModal: false
    });

    handleClickAddFooterItem = () => {

    };

    handleFooterHover = () => {
        this.footerAddBtn.classList.add('active');

        _timerForAddBtn = setTimeout(() => {
            this.footerAddBtn.classList.remove('active');
        }, 2000);
    };

    handleAddBtnEvent = () => {
        //console.log(event);
        switch (event.type) {
            case 'react-mouseenter':
                this.footerAddBtn.classList.add('active');
                clearTimeout(_timerForAddBtn);
                break;
            case 'react-mouseleave':
                _timerForAddBtn = setTimeout(() => {
                    this.footerAddBtn.classList.remove('active');
                }, 500);
                break;
            case 'react-click':
                this.setState({showModal: true});
                break;
            default:
                throw new Error('unknown event type');
        }
    };

    componentDidMount() {
        axios.get('/mock/index.json')
            .then(resp => {
                //console.log(resp.data);
                this.props.dispatch(changeViewPortItem(resp.data.contentItems));
                // todo
                this.props.dispatch(openEditModal(resp.data.contentItems[0].id));
            });
    }

    render() {
        const {showModal} = this.state;
        // console.log(this.props.viewportList);
        return <div className='viewport-wrap'>
            <div className='viewport'>
                <AppHeader />
                <div className={'viewport-content-wrap' + (this.props.isDragging ? ' active' : '')}>
                    <div className={'viewport-content'}>
                        {this.props.viewportList.map((val, index) =>
                            <ContentItem key={index} attr={val}>{index.toString()}</ContentItem>
                        )}
                    </div>
                    <div className={'noticeMask' + (this.props.mouseInViewport ? ' active' : '')}></div>
                </div>
                <div className='viewport-footer' onMouseEnter={() => this.handleFooterHover()}>
                    <Tooltip title='添加导航项' placement='left'>
                        <IconButton buttonRef={addBtn => {this.footerAddBtn = addBtn;}}
                                    onMouseEnter={() => this.handleAddBtnEvent()}
                                    onMouseLeave={() => this.handleAddBtnEvent()}
                                    onClick={() => this.handleAddBtnEvent()}
                                    className={'viewport-footer-add-btn'}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                </div>
                <EditModal />
            </div>
        </div>;
    }
}

const mapStateToProps = ({isDragging, viewportList, mouseInViewport}) => ({isDragging, viewportList, mouseInViewport});

let myViewport = connect(mapStateToProps)(Viewport);

export default myViewport;