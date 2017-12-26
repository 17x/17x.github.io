import React, {Component} from 'react';
import {withStyles} from 'material-ui';
import {connect} from 'react-redux';
import 'javascript-detect-element-resize';

import {modifyViewPortItem, openEditModal} from 'actions';
import getDom from 'utils/getDom';

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
        stickied: {x: false, y: false},
        // 鼠标按下时的坐标信息与dom坐标的差值
        mouseDownPoint: {},
        lastStickyDelta: {x: null, y: null}
    });

    // todo stickied
    handleMouseMove(e) {
        // 鼠标已经按下 并且不在元素外
        if (this.state.mouseDown && !this.state.mouseLeaved) {
            let {mouseDownPoint, stickied, lastStickyDelta} = this.state,
                needEscape = {
                    x: false,
                    y: false
                };

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
                this.setState({
                    inDragging: false
                });
            } else {
                //moving
                e.preventDefault();
                this.setState({inDragging: true});

                let oViewportDom = getDom('.viewport-content')[0],
                    oViewportDomRect = oViewportDom.getBoundingClientRect(),
                    style = Object.assign({}, this.props.attr.style),
                    _flag = {x: false, y: false},
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
                if (stickied.x && (lastStickyDelta.x === null)) {
                    this.setState({
                        lastStickyDelta: {
                            ...lastStickyDelta,
                            x: e.pageX - oViewportDomRect.top
                        }
                    });
                }
                //y轴
                if (stickied.y && !lastStickyDelta.y) {
                    this.setState({
                        lastStickyDelta: {
                            ...lastStickyDelta,
                            y: e.pageY - oViewportDomRect.left
                        }
                    });
                }

                if (stickied.x && !isNaN(lastStickyDelta.x)) {
                    needEscape.x = Math.abs(e.pageX - oViewportDomRect.left - lastStickyDelta.x) > 20;
                    console.log(`设置 吸附后 X ${needEscape.x}`);
                }

                if (stickied.y && !isNaN(lastStickyDelta.y)) {
                    needEscape.y = Math.abs(e.pageY - oViewportDomRect.top - lastStickyDelta.y) > 20;
                    console.log(`设置 吸附后 Y ${needEscape.y}`);
                }

                //console.log(lastStickyDelta);
                //console.log(needEscape);

                style.left = e.pageX - oViewportDomRect.x - mouseDownPoint.diffX;
                style.top = e.pageY - oViewportDomRect.y - mouseDownPoint.diffY + oViewportDom.scrollTop;

                if (!needEscape.x) {
                    axis.x.map(val => {
                        if (Math.abs(val - curOffset.left) < 10) {
                            style.left = val;
                            _flag.x = true;
                        } else if (Math.abs(val - curOffset.right) < 10) {
                            style.left = val - curOffset.width;
                        }
                    });
                }

                if (!needEscape.y) {
                    axis.y.map(val => {
                        if (Math.abs(val - curOffset.top) < 5) {
                            style.top = val;
                            _flag.y = true;
                        } else if (Math.abs(val - curOffset.bottom) < 5) {
                            style.top = val - curOffset.height;
                        }
                    });
                }

                if (needEscape.x) {
                    this.setState({
                        stickied: {
                            ...stickied,
                            x: false
                        },
                        lastStickyDelta: {
                            ...lastStickyDelta
                        }
                    });
                }

                if (needEscape.y) {
                    this.setState({
                        stickied: {
                            ...stickied,
                            y: false
                        },
                        lastStickyDelta: {
                            ...lastStickyDelta
                        }
                    });
                }

                if (_flag.x) {
                    this.setState({
                        stickied: {
                            ...stickied,
                            x: true
                        }
                    });
                    needEscape.x = false;
                }

                if (_flag.y) {
                    this.setState({
                        stickied: {
                            ...stickied,
                            y: true
                        }
                    });
                    needEscape.y = false;
                }

                this.props.dispatch(modifyViewPortItem({
                    id: this.props.attr.id,
                    style
                }));
            }
        } else {
            this.setState({
                inDragging: false,
                inResizing: false
            });
        }
    }

    handleMouseDown(e) {
        this.setState({
            mouseDown: true,
            mouseLeaved: false
        });

        let _rect = this.domRef.getBoundingClientRect();

        this.setState({
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
        //this.handleMouseLeave();
        this.setState({
            editing: false,
            mouseDown: false,
            mouseLeaved: true,
            inDragging: false,
            inResizing: false,
            lastStickyDelta: {x: null, y: null}
        });
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
                lastStickyDelta: {x: null, y: null}
            });
        } else {
            this.setState({
                mouseLeaved: true
            });
        }
    }

    //捕获鼠标松开事件
    handleClickCapture(e) {
        //console.log(this.state);
        // 判定为点击
        if (!this.state.inResizing && !this.state.inDragging && !this.state.mouseLeaved) {
            this.props.dispatch(openEditModal('edit', 'content', this.props.attr.id));
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
                    style={{...this.props.attr.style}}>
        </div>;
    }
}

let ContentItemCom = connect()(ContentItem);
export default withStyles(styles)(ContentItemCom);