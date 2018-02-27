import React, {Component} from 'react';

import css from 'utils/css';
import on from 'utils/on';
import off from 'utils/off';
import getDom from 'utils/getDom';

import {addItemToViewPort, isDragging, mouseInViewport} from '../../../actions';

//获取引用
let doc = document,
    tempFalseDomStyle = {
        position: 'fixed',
        display: 'block',
        cursor: 'move',
        opacity: 0.8,
        borderStyle: 'dotted',
        zIndex: 1010
    },
    //获取当前扩展对象
    _this = null,
    // 拖动开始时鼠标相对静态模型的位置偏移
    posDiff = {},
    // body内的临时拖动元素当前定位
    pos = {},
    // 模板字符存储
    sTpl = '',
    // body内的临时拖动元素的引用
    tempFalseDom,
    //视口
    oViewportDom,
    oViewportDomRect,
    oViewportMask,
    //视口的最小xy与最大xy值
    onMove = e => {
        if (!tempFalseDom) {
            tempFalseDom = doc.createElement('a');
            tempFalseDom.innerHTML = sTpl;
            // tempFalseDom.id = 'temp-false-dom';
            // tempFalseDom.classList.add(_this.state.classList[0]);
            css(tempFalseDom, {..._this.state.styles, ...tempFalseDomStyle});
            doc.body.appendChild(tempFalseDom);
        }

        pos = {
            left: e.pageX - posDiff.x,
            top: e.pageY - posDiff.y
        };

        css(tempFalseDom, pos);

        if (
            e.pageX > oViewportDomRect.min.x &&
            e.pageY > oViewportDomRect.min.y &&
            e.pageX < oViewportDomRect.max.x &&
            e.pageY < oViewportDomRect.max.y
        ) {
            _this.props.dispatch(mouseInViewport(true));
        } else {
            _this.props.dispatch(mouseInViewport(false));
        }
    },
    onUp = e => {
        getDom('body')[0].onselectstart = () => true;
        _this.props.dispatch(isDragging(false));

        if (
            e.pageX > oViewportDomRect.min.x &&
            e.pageY > oViewportDomRect.min.y &&
            e.pageX < oViewportDomRect.max.x &&
            e.pageY < oViewportDomRect.max.y
        ) {
            let style = {
                    ..._this.state.applyStyle,
                    border: null,
                    position: 'absolute',
                    overflow: 'hidden',
                    background: '#fff',
                    minWidth: 20,
                    minHeight: 20,
                    zIndex: 99999,
                    left: (e.pageX - oViewportDomRect.min.x - posDiff.x) / (oViewportDom.scrollWidth > 320 ? 320 : oViewportDom.scrollWidth) * 100 + '%',
                    top: e.pageY - oViewportDomRect.min.y - posDiff.y + oViewportDom.scrollTop
                },
                modelConfig = {
                    modelType: _this.state.modelType,
                    isRichTextPage: false,
                    richPageId: '',
                    style,
                    ..._this.state.additionProps
                };

            _this.props.dispatch(addItemToViewPort(modelConfig));
        }

        if (tempFalseDom) {
            doc.body.removeChild(tempFalseDom);
            tempFalseDom = null;
        }

        off(doc, 'mousemove', onMove);
        off(doc, 'mouseup', onUp);
    };

class Model extends Component {
    constructor(props) {
        super(props);
    }

    handleMouseDown = (e) => {
        getDom('body')[0].onselectstart = () => false;

        _this = this;
        _this.props.dispatch(isDragging(true));

        posDiff = {
            x: e.pageX - this.domRef.getBoundingClientRect().x,
            y: e.pageY - this.domRef.getBoundingClientRect().y
        };

        sTpl = this.domRef.innerHTML;
        oViewportDom = getDom('.viewport-content')[0];
        oViewportMask = getDom('.noticeMask')[0];

        let _rect = oViewportDom.getBoundingClientRect();

        oViewportDomRect = ({
            min: {
                x: _rect.x,
                y: _rect.y
            },
            max: {
                x: _rect.right,
                y: _rect.bottom
            }
        });

        on(doc, 'mousemove', onMove);
        on(doc, 'mouseup', onUp);
    };

    render() {
        return null;
    }
}

export default Model;