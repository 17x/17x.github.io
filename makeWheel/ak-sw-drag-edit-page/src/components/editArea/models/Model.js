import React, {Component} from 'react';

import css from '../../../assets/util/css';
import on from '../../../assets/util/on';
import off from '../../../assets/util/off';
import getDom from '../../../assets/util/getDom';

import {isDragging, addItemToViewPort, mouseInViewport} from '../../../actions';

//获取引用
let doc = document,
    tempFalseDomStyle = {
        position: 'fixed',
        display: 'block',
        cursor: 'move',
        opacity: 0.8,
        borderStyle: 'dotted'
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
        _this.props.dispatch(isDragging(false));

        if (
            e.pageX > oViewportDomRect.min.x &&
            e.pageY > oViewportDomRect.min.y &&
            e.pageX < oViewportDomRect.max.x &&
            e.pageY < oViewportDomRect.max.y
        ) {
            const style = {
                ..._this.state.styles,
                width: '50%',
                border: null,
                resize: 'both',
                position: 'absolute',
                overflow: 'hidden',
                background: '#fff',
                minWidth: 50,
                minHeight: 50,
                maxWidth: 320,
                left: e.pageX - oViewportDomRect.min.x - posDiff.x,
                top: e.pageY - oViewportDomRect.min.y - posDiff.y + oViewportDom.scrollTop
            };

            _this.props.dispatch(addItemToViewPort({
                modelType: _this.state.modelType,
                style
            }));
        }

        if (tempFalseDom) {
            doc.body.removeChild(tempFalseDom);
            tempFalseDom = null;
        }

        off(doc, 'mousemove', onMove, false);
        off(doc, 'mouseup', onUp, false);
    };

class Model extends Component {
    constructor(props) {
        super(props);
    }

    handleMouseDown = (e) => {
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

        on(doc, 'mousemove', onMove, false);
        on(doc, 'mouseup', onUp, false);
    };

    render() {
        return null;
    }
}

export default Model;