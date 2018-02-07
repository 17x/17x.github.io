import React, {Component} from 'react';
import {withStyles} from 'material-ui';
import {connect} from 'react-redux';

import on from 'utils/on';
import off from 'utils/off';
import getDom from 'utils/getDom';
import typeCheck from 'utils/typeCheck';

import {modifyViewPortItem, openEditModal, addItemToViewPort} from 'actions';
import styles from './contentStyle';

//基础样式
let //编辑区视图尺寸
    baseViewWidth = 320,
    baseViewHeight = 440,
    doc = document,
    // this 保存
    _this = null,
    //鼠标按下后绑定的事件
    //移动与resize的主要处理逻辑在此
    onMouseMove = e => {
        //基础状态
        let
            //内容视口
            oViewportDom = getDom('.viewport-content')[0],
            //Rect 数据
            oViewportDomRect = oViewportDom.getBoundingClientRect(),
            //子元素的边界
            oItemRefs = getDom('.viewport-content')[0].childNodes,
            //样式拷贝
            style = Object.assign({}, _this.props.attr.style),
            //当前编辑元素的 Rect 数据
            curBorder = _this.domRef.getBoundingClientRect(),
            //当前编辑元素的基础信息
            curOffset = {
                left: _this.domRef.offsetLeft,
                top: _this.domRef.offsetTop,
                right: _this.domRef.offsetLeft + _this.domRef.offsetWidth,
                bottom: _this.domRef.offsetTop + _this.domRef.offsetHeight,
                width: _this.domRef.offsetWidth,
                height: _this.domRef.offsetHeight
            };

        _this.setState({editing: true});

    },
    onMouseUp = () => {
        off(doc, 'mousemove', onMouseMove);
        off(doc, 'mouseup', onMouseUp);
    };

class ContentItem extends Component {
    constructor(props) {
        super(props);
    }

    state = ({});

    handleMouseDown(e) {
        //鼠标左键
        switch (e.nativeEvent.which) {
            case 3:

                break;
            default:
        }
    }

    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        const {classes, attr} = this.props;
        return <div onMouseDown={(e) => this.handleMouseDown(e)}
                    className={[classes.root, this.state.editing ? classes.rootHover : ' '].join(' ')}
                    ref={dom => this.domRef = dom}
                    title='点击打开编辑框 ； 拖拽移动 ； 按住右下角缩放'
                    style={{
                        ...attr.style,
                        lineHeight: attr.style.lineHeight ? attr.style.lineHeight.toString() + 'px' : 'normal'
                    }}>
        </div>;
    }
}

let ContentItemCom = connect()(ContentItem);
export default withStyles(styles)(ContentItemCom);