import React, {Component} from 'react';
import axios from 'axios';
//import qs from 'qs';
import {connect} from 'react-redux';

import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import AddIcon from 'material-ui-icons/Add';

import './style.scss';
import getDom from 'utils/getDom';

import EditModal from '../editModal';
import ContentItem from '../models/ContentItem';
import FooterItem from '../models/FooterItem';
import AppHeader from '../Header';
import {
    replaceViewPortItem,
    openEditModal,
    replaceFooterItem,
    setCompanyList,
    setCategoryList,
    setBrandList
} from 'actions';

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

    handleAddBtnEvent = (event) => {
        const dom = getDom('.viewport-footer-add-btn-wrap')[0];
        switch (event.type) {
            case 'mouseenter':
                dom.classList.add('active');
                clearTimeout(_timerForAddBtn);
                break;
            case 'mouseleave':
                _timerForAddBtn = setTimeout(() => {
                    dom.classList.remove('active');
                }, 500);
                break;
            case 'click':
                this.props.dispatch(openEditModal('add', 'foot'));
                dom.classList.remove('active');
                break;
            default:
                throw new Error('unknown event type');
        }
    };

    componentDidMount() {
        //todo 上线注释此处
        /*

                //模板串
                axios.get(
                    '/mock/data.json').then(resp => {
                    this.props.dispatch(replaceViewPortItem(resp.data.viewportList));
                    this.props.dispatch(replaceFooterItem(resp.data.footList));
                });

    */

        //todo 开发注释此处
        //模板串
        /*axios.post(
            'updatePageHtmlString.html').then(resp => {
            if (resp.data.ok) {
                const resultData = JSON.parse(resp.data.object.data);
                // console.log(resultData);
                this.props.dispatch(replaceViewPortItem(resultData.viewportList));
                this.props.dispatch(replaceFooterItem(resultData.footList));
            }
        });*/

    }

    render() {
        const {viewportList} = this.props;
        return <div className='viewport-wrap'>
            <div className='viewport'>
                <div className={'viewport-content-wrap' + (this.props.isDragging ? ' active' : '')}>
                    <div className={'viewport-content'}>
                        {viewportList.map((val, index) =>
                            <ContentItem key={index} attr={val} />
                        )}
                    </div>
                    <div className={'noticeMask' + (this.props.mouseInViewport ? ' active' : '')}></div>
                </div>

                <EditModal />
            </div>
        </div>;
    }
}

const mapStateToProps = ({isDragging, viewportList, mouseInViewport}) => ({
    isDragging,
    viewportList,
    mouseInViewport
});

let myViewport = connect(mapStateToProps)(Viewport);

export default myViewport;