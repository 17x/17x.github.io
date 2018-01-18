import React, {Component} from 'react';
import {withStyles} from 'material-ui';
import {connect} from 'react-redux';

import on from 'utils/on';
import off from 'utils/off';
import getDom from 'utils/getDom';
import typeCheck from 'utils/typeCheck';

import {modifyViewPortItem, openEditModal, addAxis, clearAddAxis, addItemToViewPort} from 'actions';
import styles from './contentStyle';
import Slider from './Slider';
//基础样式
let //编辑区视图尺寸
    baseViewWidth = 320,
    baseViewHeight = 440,
    //获取省时
    doc = document,
    // this 保存
    _this = null,
    //  双击判断定时器
    _timer = null,
    //鼠标按下后绑定的事件
    //移动与resize的主要处理逻辑在此
    onMouseMove = e => {
        let {mouseDownPoint, stickied, lastStickyDelta, escaping, btnResizeClicked} = _this.state,
            oViewportDom = getDom('.viewport-content')[0],
            oViewportDomRect = oViewportDom.getBoundingClientRect(),
            oItemRefs = getDom('.viewport-content')[0].childNodes,
            axis = {
                x: [0, oViewportDom.scrollWidth > baseViewWidth ? baseViewWidth : oViewportDom.scrollWidth],
                y: [0, oViewportDom.scrollHeight]
            },
            style = Object.assign({}, _this.props.attr.style),
            curBorder = _this.domRef.getBoundingClientRect(),
            curOffset = {
                left: _this.domRef.offsetLeft,
                top: _this.domRef.offsetTop,
                right: _this.domRef.offsetLeft + _this.domRef.offsetWidth,
                bottom: _this.domRef.offsetTop + _this.domRef.offsetHeight,
                width: _this.domRef.offsetWidth,
                height: _this.domRef.offsetHeight
            },
            clearStickData = (axis) => {
                _this.setState({
                    stickied: {
                        ...stickied,
                        [axis]: false
                    },
                    lastStickyDelta: {
                        ...lastStickyDelta,
                        [axis]: null
                    },
                    escaping: {
                        ...escaping,
                        [axis]: false
                    }
                });
            },
            updateLastStickyDelta = (axis, num) => {
                _this.setState({
                    lastStickyDelta: {
                        ...lastStickyDelta,
                        [axis]: num
                    }
                });
            },
            setStickState = (axis, propName, propNum) => {
                _this.setState({
                    stickied: {
                        ...stickied,
                        [axis]: true,
                        [propName]: propNum
                    },
                    escaping: {
                        ...escaping,
                        [axis]: false
                    },
                    lastStickyDelta: {
                        ...lastStickyDelta,
                        [axis]: null
                    }
                });
            },
            setEscapingState = (axis) => {};

        //将其他DOM的边界push进列表
        [...oItemRefs].map(val => {
            if (val !== _this.domRef) {
                axis.x.push(val.offsetLeft);
                axis.x.push(val.offsetLeft + val.offsetWidth);
                axis.y.push(val.offsetTop);
                axis.y.push(val.offsetTop + val.offsetHeight);
            }
        });

        _this.setState({editing: true});

        // 判定一开始是在右下角点击的
        if (btnResizeClicked) {
            //这里将当前宽高替换 因为复制出来的值可能是百分比或者其他
            style = {
                ...style,
                width: curOffset.width,
                height: curOffset.height
            };

            // resizing

            //x轴
            //如果处于吸附状态
            if (stickied.x) {
                //console.log(style.width);
                _this.props.dispatch(clearAddAxis());
                _this.props.dispatch(addAxis('x', stickied.xPosition === 'left' ? curOffset.left : curOffset.right - 1));
                //移动摆脱吸附力度
                if (typeCheck(lastStickyDelta.x) === 'Number') {
                    const needEscape = Math.abs(e.pageX - lastStickyDelta.x) > 10;

                    //release sticky x
                    if (needEscape) {
                        style.width = e.pageX - curBorder.left + mouseDownPoint.offsetRight;
                        _this.props.dispatch(clearAddAxis());
                        clearStickData('x');
                    } else {
                        _this.setState({
                            escaping: {
                                ...escaping,
                                x: true
                            }
                        });
                    }
                } else {
                    updateLastStickyDelta('x', e.pageX);
                }
            }
            else {
                if (lastStickyDelta.x === null) {
                    updateLastStickyDelta('x', e.pageX);
                }
                style.width = e.pageX - curBorder.left + mouseDownPoint.offsetRight;

                let axisProps = {},
                    minBorderXDistance = Math.min(
                        ...axis.x.map(val => {
                            const curRightBorder = Math.abs(val - curOffset.right);
                            if (curRightBorder < 5) {
                                axisProps.position = 'right';
                                axisProps.pixel = val;
                                //console.log('yes');

                                return val - curOffset.left;
                            } else {
                                return Infinity;
                            }
                        })
                    );

                //console.log(style.width);
                // sticky X
                if (minBorderXDistance !== Infinity) {
                    //console.log(minBorderXDistance);
                    _this.props.dispatch(clearAddAxis());
                    _this.props.dispatch(addAxis('x', axisProps.pixel));
                    style.width = minBorderXDistance;

                    setStickState('x', 'xPosition', axisProps.position);
                }
            }

            //y轴
            if (stickied.y) {
                _this.props.dispatch(clearAddAxis());
                _this.props.dispatch(addAxis('y', stickied.yPosition === 'top' ? curOffset.top : curOffset.bottom - 1));
                //移动摆脱吸附力度
                if (typeCheck(lastStickyDelta.y) === 'Number') {
                    const needEscape = Math.abs(e.pageY - lastStickyDelta.y) > 10;

                    if (needEscape) {
                        style.height = e.pageY - curBorder.top + mouseDownPoint.offsetBottom;
                        _this.props.dispatch(clearAddAxis());
                        clearStickData('y');
                    } else {
                        _this.setState({
                            escaping: {
                                ...escaping,
                                y: true
                            }
                        });
                    }
                } else {
                    updateLastStickyDelta('y', e.pageY);
                }
            }
            else {
                if (lastStickyDelta.y === null) {
                    updateLastStickyDelta('y', e.pageY);
                }

                style.height = e.pageY - curBorder.top + mouseDownPoint.offsetBottom;
                let axisProps = {},
                    minBorderYDistance = Math.min(
                        ...axis.y.map(val => {
                            const curBottomBorder = Math.abs(val - curOffset.bottom);
                            if (curBottomBorder < 15) {
                                //console.log(val, curOffset.bottom);
                                axisProps.position = 'bottom';
                                axisProps.pixel = val;

                                return val - curOffset.top;
                            } else {
                                return Infinity;
                            }
                        })
                    );

                // sticky Y
                if (minBorderYDistance !== Infinity) {
                    _this.props.dispatch(clearAddAxis());
                    _this.props.dispatch(addAxis('y', axisProps.pixel));
                    style.height = minBorderYDistance;

                    setStickState('y', 'yPosition', axisProps.position);
                }
            }

            if (_this.state.shiftKeyDown) {
                style.width = style.height = Math.max(style.width, style.height);
            }

            //设置最小宽高
            style.width = style.width < 20 ? 20 : style.width;
            style.height = style.height < 20 ? 20 : style.height;

            //处理页面可能处于滚动时导致宽度变窄

            style.width = (style.width / axis.x[1]) * 100 + '%';

            _this.props.dispatch(modifyViewPortItem({
                ..._this.props.attr,
                style
            }));
        }
        else {
            // console.log('moving');
            //moving
            style = {
                ...style,
                left: curOffset.left,
                top: curOffset.top
            };

            //x轴
            if (stickied.x) {
                _this.props.dispatch(clearAddAxis());
                _this.props.dispatch(addAxis('x', stickied.xPosition === 'left' ? curOffset.left : curOffset.right - 1));

                //移动摆脱吸附力度
                if (typeCheck(lastStickyDelta.x) === 'Number') {
                    const needEscape = Math.abs(e.pageX - lastStickyDelta.x) > 10;

                    //release sticky x
                    if (needEscape) {
                        style.left = e.pageX - oViewportDomRect.x - mouseDownPoint.diffX;
                        _this.props.dispatch(clearAddAxis());
                        clearStickData('x');
                    } else {
                        _this.setState({
                            escaping: {
                                ...escaping,
                                x: true
                            }
                        });
                    }
                } else {
                    updateLastStickyDelta('x', e.pageX);
                }
            }
            else {
                if (lastStickyDelta.x === null) {
                    _this.setState({
                        lastStickyDelta: {
                            ...lastStickyDelta,
                            x: e.pageX
                        }
                    });
                }

                style.left = e.pageX - oViewportDomRect.x - mouseDownPoint.diffX;

                let axisProps = {},
                    minBorderXDistance = Math.min(
                        ...axis.x.map(val => {
                            const curLeftBorder = Math.abs(val - curOffset.left),
                                curRightBorder = Math.abs(val - curOffset.right);
                            if (curLeftBorder < 5) {
                                axisProps.position = 'left';
                                axisProps.pixel = val;

                                return val;
                            } else if (curRightBorder < 5) {
                                axisProps.position = 'right';
                                axisProps.pixel = val;

                                return val - curOffset.width;
                            } else {
                                return Infinity;
                            }
                        })
                    );

                // sticky X
                if (minBorderXDistance !== Infinity) {
                    _this.props.dispatch(clearAddAxis());
                    _this.props.dispatch(addAxis('x', axisProps.pixel));
                    style.left = minBorderXDistance;
                    setStickState('x', 'xPosition', axisProps.position);
                }
            }

            //y轴
            if (stickied.y) {
                _this.props.dispatch(clearAddAxis());
                _this.props.dispatch(addAxis('y', stickied.yPosition === 'top' ? curOffset.top - oViewportDom.scrollTop : curOffset.bottom - 1));
                //移动摆脱吸附力度
                if (typeCheck(lastStickyDelta.y) === 'Number') {
                    const needEscape = Math.abs(e.pageY - lastStickyDelta.y) > 15;
                    //console.log(needEscape);
                    if (needEscape) {
                        _this.props.dispatch(clearAddAxis());
                        style.top = e.pageY - oViewportDomRect.y - mouseDownPoint.diffY + oViewportDom.scrollTop;

                        clearStickData('y');
                    } else {
                        _this.setState({
                            escaping: {
                                ...escaping,
                                y: true
                            }
                        });
                    }
                } else {
                    updateLastStickyDelta('y', e.pageY);
                }
            }
            else {
                if (lastStickyDelta.y === null) {
                    _this.setState({
                        lastStickyDelta: {
                            ...lastStickyDelta,
                            y: e.pageY
                        }
                    });
                }

                style.top = e.pageY - oViewportDomRect.y - mouseDownPoint.diffY + oViewportDom.scrollTop;
                let axisProps = {},
                    minBorderYDistance = Math.min(
                        ...axis.y.map(val => {
                            const curTopBorder = Math.abs(val - curOffset.top),
                                curBottomBorder = Math.abs(val - curOffset.bottom);
                            if (curTopBorder < 10) {
                                axisProps.position = 'top';
                                axisProps.pixel = val;

                                return val;
                            } else if (curBottomBorder < 10) {
                                axisProps.position = 'bottom';
                                axisProps.pixel = val;

                                return val - curOffset.height;
                            } else {
                                return Infinity;
                            }
                        })
                    );

                // sticky Y
                if (minBorderYDistance !== Infinity) {
                    _this.props.dispatch(clearAddAxis());
                    _this.props.dispatch(addAxis('y', axisProps.pixel));
                    style.top = minBorderYDistance;

                    setStickState('y', 'yPosition', axisProps.position);
                }
            }

            style.left = style.left / axis.x[1] * 100 + '%';

            _this.props.dispatch(modifyViewPortItem({
                ..._this.props.attr,
                style
            }));
        }
    },
    onMouseUp = () => {
        off(doc, 'mousemove', onMouseMove);
        off(doc, 'mouseup', onMouseUp);
        off(doc, 'keydown', onKeyDown);
        off(doc, 'keyup', onKeyUp);

        _this.setState({
            editing: false,
            btnResizeEnter: false,
            btnResizeClicked: false,
            leftMouseDown: false,
            shiftKeyDown: false,
            lastStickyDelta: {x: null, y: null},
            escaping: {x: false, y: false}
        });
        _this.props.dispatch(clearAddAxis());
    },
    onKeyDown = (e) => (_this && _this.state.shiftKeyDown) || _this.setState({shiftKeyDown: e.shiftKey}),
    onKeyUp = () => {
        _this.setState({
            shiftKeyDown: false
        });
    };

class ContentItem extends Component {
    constructor(props) {
        super(props);
    }

    state = ({
        btnResizeEnter: false,
        btnResizeClicked: false,
        leftMouseDown: false,
        shiftKeyDown: false,
        // 鼠标按下时的坐标信息与dom坐标的差值
        mouseDownPoint: {},
        stickied: {x: false, y: false, xPosition: null, yPosition: null},
        escaping: {x: false, y: false},
        lastStickyDelta: {x: null, y: null}
    });

    handleMouseDown(e) {
        //console.log(this.state.btnResizeEnter);
        switch (e.nativeEvent.which) {
            case 1:
                _this = this;

                let _rect = this.domRef.getBoundingClientRect(),
                    {dispatch, attr} = this.props;

                if (this.state.lastClick) {
                    dispatch(openEditModal('edit', 'content', attr.id));
                }

                const mouseDownPoint = {
                        //基础位置
                        x: e.pageX,
                        y: e.pageY,
                        //鼠标按下时相对于当前项目左上角距离
                        diffX: e.pageX - _rect.x,
                        diffY: e.pageY - _rect.y,
                        offsetRight: _rect.right - e.pageX,
                        offsetBottom: _rect.bottom - e.pageY
                    },
                    //多出0.5个像素 用于处理边界模糊点击
                    btnResizeClicked = (
                        (_rect.right - e.pageX) > 0 && (_rect.right - e.pageX) <= 10.5 &&
                        (_rect.bottom - e.pageY) > 0 && (_rect.bottom - e.pageY) <= 10.5
                    );

                this.setState({
                    lastClick: true,
                    leftMouseDown: true,
                    btnResizeClicked,
                    mouseDownPoint
                });

                on(doc, 'mousemove', onMouseMove);
                on(doc, 'mouseup', onMouseUp);
                on(doc, 'keydown', onKeyDown);
                on(doc, 'keyup', onKeyUp);

                _timer = setTimeout(() => this.setState({lastClick: false}), 200);

                break;
            //wheel
            case 2:
                break;
            //right
            case 3:
                if (this.state.leftMouseDown) {
                    onMouseUp();
                    // do copy
                    let newItem = Object.assign({}, {
                        ..._this.props.attr,
                        // deep copy
                        style: Object.assign({}, _this.props.attr.style)
                    });
                    // console.log(newItem.style);

                    //设置复制后新元素出现的位置偏移
                    if (typeCheck(newItem.style.left) === 'Number') {
                        newItem.style.left += 1;
                    } else {
                        newItem.style.left = parseInt(newItem.style.left) + 2 + '%';
                    }

                    if (typeCheck(newItem.style.top) === 'Number') {
                        newItem.style.top += 1;
                    } else {
                        newItem.style.top = parseInt(newItem.style.top) + 2 + '%';
                    }

                    delete newItem.id;
                    console.log('newItem', newItem);
                    _this.props.dispatch(addItemToViewPort(newItem));
                }

                break;
            default:
        }
    }

    componentDidMount() {}

    componentWillUnmount() {
        _timer && clearTimeout(_timer);
    }

    render() {
        const {classes, attr} = this.props;
        //console.log(attr);
        return <div onMouseDown={(e) => this.handleMouseDown(e)}
                    className={[classes.root, this.state.editing ? classes.rootHover : ' '].join(' ')}
                    ref={dom => this.domRef = dom}
                    title='点击打开编辑框 ； 拖拽移动 ； 按住右下角缩放'
                    style={{...attr.style}}>

            {
                attr.subImg &&
                <img src={attr.subImg}
                     className={[classes.subImg, attr.subImgStretch ? classes.subImgStretch : ' '].join(' ')} />
            }
            {
                attr.text &&
                <p className={classes.subText}>{attr.text}</p>
            }
            {
                attr.carousel &&
                <Slider slide={attr.carousel} classes={classes} />
            }

            <span className={classes.handleResize}
                  onMouseLeave={() => this.setState({btnResizeEnter: false})}
                  onMouseEnter={() => this.setState({btnResizeEnter: true})}> </span>
        </div>;
    }
}

let ContentItemCom = connect()(ContentItem);
export default withStyles(styles)(ContentItemCom);