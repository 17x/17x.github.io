import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {component} from 'react-decoration';
//import qs from 'qs';
import './style.scss';

import {
    replaceViewPortItem,
    openEditModal
} from 'actions';
import Container from './Container';

const mapStateToProps = ({isDragging, viewportList, mouseInViewport}) => ({
    isDragging,
    viewportList,
    mouseInViewport
});

// let myViewport = connect(mapStateToProps)(Viewport);

@component
@connect(mapStateToProps)
class Viewport extends Component {
    constructor(props) {
        super(props);
    }

    state = ({});

    componentDidMount() {
        //todo 上线注释此处

        //模板串
        axios.get('/mock/data.json').then(resp => {
            this.props.dispatch(replaceViewPortItem(resp.data.viewportList));
        });

        //todo 开发注释此处
        //模板串
        /*axios.post(
            'updatePageHtmlString.html').then(resp => {
            if (resp.data.ok) {
                const resultData = JSON.parse(resp.data.object.data);
                // console.log(resultData);
                this.props.dispatch(replaceViewPortItem(resultData.viewportList));
            }
        });*/
    }

    render() {
        const {viewportList} = this.props;
        return <div className='viewport-wrap'>
            <div className={'viewport' + (this.props.isDragging ? ' active' : '')}>
                <Container />
                <div className={'noticeMask' + (this.props.mouseInViewport ? ' active' : '')}></div>
            </div>
        </div>;
    }
}

export default Viewport;