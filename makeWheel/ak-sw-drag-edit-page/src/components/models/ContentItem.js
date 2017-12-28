import React, {Component} from 'react';
import {withStyles} from 'material-ui';
import {connect} from 'react-redux';
import 'javascript-detect-element-resize';

import {modifyViewPortItem, openEditModal, addAxis, clearAddAxis} from 'actions';
import getDom from 'utils/getDom';
import typeCheck from 'utils/typeCheck';

const styles = {
        root: {
            '&:after': {
                content: '" "',
                position: 'absolute',
                display: 'block',
                width: 10,
                height: 10,
                right: 0,
                bottom: 0,
                cursor: 'nwse-resize'
            },
            '&:hover': {}
        },
        rootHover: {
            border: '2px dashed #171717',
            zIndex: '9999!important'
        },
        deleteButton: {
            display: 'none',
            width: 24,
            height: 24,
            backgroundColor: '#d4d4d4',
            color: '#999',
            '&:hover': {
                color: '#fff'
            }
        }
    },
    baseViewWidth = 320;

class ContentItem extends Component {
    constructor(props) {
        super(props);
    }

    state = ({
        mouseEnter: false,
        mouseDown: false,
        mouseLeaved: true,
        inDragging: false,
        inResizing: false,
        // 鼠标按下时的坐标信息与dom坐标的差值
        mouseDownPoint: {},
        stickied: {x: false, y: false, xPosition: null, yPosition: null},
        escaping: {x: false, y: false},
        lastStickyDelta: {x: null, y: null}
    });

    handleMouseMove(e) {
        // 鼠标已经按下 并且不在元素外
        if (this.state.mouseDown && !this.state.mouseLeaved) {
            let {mouseDownPoint, stickied, lastStickyDelta, escaping} = this.state;

            this.setState({
                editing: true
            });

            // 判定一开始是在右下角点击的
            if (
                mouseDownPoint.x > mouseDownPoint.domMinX &&
                mouseDownPoint.x < mouseDownPoint.domMaxX &&
                mouseDownPoint.y > mouseDownPoint.domMinY &&
                mouseDownPoint.y < mouseDownPoint.domMaxY
            ) {
                // resizing
                // 设置状态后交由resizeCapture处理
                // this.setState({inDragging: false});
            } else {
                //moving
                e.preventDefault();
                // 移动了一定距离之后认为在拖拽
                if (Math.abs(e.pageX - mouseDownPoint.x) > 1 && Math.abs(e.pageX - mouseDownPoint.y) > 1) {
                    //console.log(mouseDownPoint);
                    this.setState({inDragging: true});
                }

                let oViewportDom = getDom('.viewport-content')[0],
                    oViewportDomRect = oViewportDom.getBoundingClientRect(),
                    style = Object.assign({}, this.props.attr.style),
                    oItemRefs = getDom('.viewport-content')[0].childNodes,
                    axis = {
                        x: [0, 320],
                        y: [0, 440]
                    },
                    curOffset = {
                        left: this.domRef.offsetLeft,
                        top: this.domRef.offsetTop,
                        right: this.domRef.offsetLeft + this.domRef.offsetWidth,
                        bottom: this.domRef.offsetTop + this.domRef.offsetHeight,
                        width: this.domRef.offsetWidth,
                        height: this.domRef.offsetHeight
                    };

                //将其他DOM的边界push进列表
                [...oItemRefs].map(val => {
                    if (val !== this.domRef) {
                        axis.x.push(val.offsetLeft);
                        axis.x.push(val.offsetLeft + val.offsetWidth);
                        axis.y.push(val.offsetTop);
                        axis.y.push(val.offsetTop + val.offsetHeight);
                    }
                });

                //x轴
                if (stickied.x) {
                    this.props.dispatch(clearAddAxis());
                    this.props.dispatch(addAxis('x', stickied.xPosition === 'left' ? curOffset.left : curOffset.right));
                    //移动摆脱吸附力度
                    if (typeCheck(lastStickyDelta.x) === 'Number') {
                        const needEscape = Math.abs(e.pageX - lastStickyDelta.x) > 15;
                        //console.log(needEscape);

                        //release sticky x
                        if (needEscape) {
                            style.left = e.pageX - oViewportDomRect.x - mouseDownPoint.diffX;
                            this.props.dispatch(clearAddAxis());
                            this.setState({
                                stickied: {
                                    ...stickied,
                                    x: false
                                },
                                lastStickyDelta: {
                                    ...lastStickyDelta,
                                    x: null
                                },
                                escaping: {
                                    ...escaping,
                                    x: false
                                }
                            });
                        } else {
                            this.setState({
                                escaping: {
                                    ...escaping,
                                    x: true
                                }
                            });
                        }
                    } else {
                        this.setState({
                            lastStickyDelta: {
                                ...lastStickyDelta,
                                x: e.pageX
                            }
                        });
                    }
                } else {
                    if (lastStickyDelta.x === null) {
                        this.setState({
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
                                if (curLeftBorder < 10) {
                                    axisProps.position = 'left';
                                    axisProps.pixel = val;

                                    return val;
                                } else if (curRightBorder < 10) {
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
                        this.props.dispatch(clearAddAxis());
                        this.props.dispatch(addAxis('x', axisProps.pixel));
                        style.left = minBorderXDistance;

                        this.setState({
                            stickied: {
                                ...stickied,
                                x: true,
                                xPosition: axisProps.position
                            },
                            escaping: {
                                ...escaping,
                                x: false
                            },
                            lastStickyDelta: {
                                ...lastStickyDelta,
                                x: null
                            }
                        });
                    }
                }

                //y轴
                if (stickied.y) {
                    this.props.dispatch(clearAddAxis());
                    this.props.dispatch(addAxis('y', stickied.yPosition === 'top' ? curOffset.top : curOffset.bottom));
                    //移动摆脱吸附力度
                    if (typeCheck(lastStickyDelta.y) === 'Number') {
                        const needEscape = Math.abs(e.pageY - lastStickyDelta.y) > 15;
                        //console.log(needEscape);
                        if (needEscape) {
                            this.props.dispatch(clearAddAxis());
                            style.top = e.pageY - oViewportDomRect.y - mouseDownPoint.diffY + oViewportDom.scrollTop;
                            this.setState({
                                stickied: {
                                    ...stickied,
                                    y: false
                                },
                                lastStickyDelta: {
                                    ...lastStickyDelta,
                                    y: null
                                },
                                escaping: {
                                    ...escaping,
                                    y: false
                                }
                            });
                        } else {
                            this.setState({
                                escaping: {
                                    ...escaping,
                                    y: true
                                }
                            });
                        }
                    } else {
                        this.setState({
                            lastStickyDelta: {
                                ...lastStickyDelta,
                                y: e.pageY
                            }
                        });
                    }
                } else {
                    if (lastStickyDelta.y === null) {
                        this.setState({
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
                        this.props.dispatch(clearAddAxis());
                        this.props.dispatch(addAxis('y', axisProps.pixel));
                        style.top = minBorderYDistance;
                        this.setState({
                            stickied: {
                                ...stickied,
                                y: true,
                                yPosition: axisProps.position
                            },
                            escaping: {
                                ...escaping,
                                y: false
                            },
                            lastStickyDelta: {
                                ...lastStickyDelta,
                                y: null
                            }
                        });
                    }
                }

                this.props.dispatch(modifyViewPortItem({
                    id: this.props.attr.id,
                    style: {
                        ...style,
                        left: typeCheck(style.left) === 'Number' ? style.left / 320 * 100 + '%' : style.left
                        // top:style.top/320 *100 + '%',
                    }
                }));
            }
        } else {
            /*this.setState({
                inDragging: false,
                inResizing: false
            });*/
        }
    }

    handleMouseDown(e) {
        let _rect = this.domRef.getBoundingClientRect();
        //console.log(e.pageX, e.pageY);

        this.setState({
            mouseDown: true,
            mouseLeaved: false,
            mouseDownPoint: {
                //基础位置
                x: e.pageX,
                y: e.pageY,
                //鼠标偏移
                diffX: e.pageX - _rect.x,
                diffY: e.pageY - _rect.y,
                //右下角缩放区坐标
                domMinX: _rect.right - 10,
                domMaxX: _rect.right,
                domMinY: _rect.bottom - 10,
                domMaxY: _rect.bottom
            }
        });
    }

    handleMouseUp(e) {
        console.log(this.state);

        if (!this.state.inResizing && !this.state.inDragging && !this.state.mouseLeaved) {
            this.props.dispatch(openEditModal('edit', 'content', this.props.attr.id));
        }

        this.setState({
            editing: false,
            mouseDown: false,
            mouseLeaved: true,
            inDragging: false,
            inResizing: false,
            lastStickyDelta: {x: null, y: null},
            escaping: {x: false, y: false}
        });
        this.props.dispatch(clearAddAxis());
    }

    handleMouseLeave() {
        //按下后鼠标可能会移出到元素外
        if (!this.state.mouseDown) {
            this.setState({
                editing: false,
                mouseDown: false,
                mouseLeaved: true,
                inDragging: false,
                inResizing: false,
                lastStickyDelta: {x: null, y: null},
                escaping: {x: false, y: false}
            });
            this.props.dispatch(clearAddAxis());
        } else {
            this.setState({
                mouseLeaved: true
            });
        }
    }

    //捕获鼠标松开事件
    handleClickCapture(e) {
        // 判定为点击
        if (!this.state.inResizing && !this.state.inDragging && !this.state.mouseLeaved) {
            // this.props.dispatch(openEditModal('edit', 'content', this.props.attr.id));
        }
    }

    handleResize() {
        // 解决监控插件首次自动运行
        let _firstAutoRun = true;
        return () => {
            //console.log(this.domRef.getBoundingClientRect());

            let _currentStyle = this.domRef.getBoundingClientRect();

            this.setState({
                inResizing: !_firstAutoRun
            });
            // 只有当鼠标按下时才被认为使用resize功能
            if (
                !_firstAutoRun
                && this.state.mouseDown
                && this.state.inResizing
                && !this.state.inDragging
            ) {
                this.props.dispatch(modifyViewPortItem({
                    id: this.props.attr.id,
                    style: {
                        ...Object.assign({}, this.props.attr.style),
                        width: (_currentStyle.width / baseViewWidth) * 100 + '%',
                        height: _currentStyle.height
                    }
                }));
                //console.log(_currentStyle.width, _currentStyle.width / baseViewWidth);
            }
            _firstAutoRun = false;
        };
    }

    componentDidMount() {
        addResizeListener(this.domRef, this.handleResize());
    }

    componentWillUnmount() {
        removeResizeListener(this.domRef, this.handleResize);
    }

    render() {
        //console.log(this.props.attr.style);
        const {classes} = this.props;
        return <div onMouseDown={(e) => this.handleMouseDown(e)}
                    onMouseMove={(e) => this.handleMouseMove(e)}
                    onMouseUp={(e) => this.handleMouseUp(e)}
                    onMouseLeave={(e) => this.handleMouseLeave(e)}
                    onMouseUpCapture={(e) => this.handleClickCapture(e)}
                    className={[classes.root, this.state.editing ? classes.rootHover : ' '].join(' ')}
                    ref={dom => this.domRef = dom}
                    title='点击打开编辑框 ； 拖拽移动 ； 按住右下角缩放'
                    style={{...this.props.attr.style}}>
        </div>;
    }
}

let ContentItemCom = connect()(ContentItem);
export default withStyles(styles)(ContentItemCom);