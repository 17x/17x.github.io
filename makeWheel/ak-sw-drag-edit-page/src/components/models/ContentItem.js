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
        stickied: false,
        // 鼠标按下时的坐标信息与dom坐标的差值
        mouseDownPoint: {}
    });

    handleMouseMove(e) {
        // 鼠标已经按下
        if (this.state.mouseDown) {
            //console.log(this.state);
            const {mouseDownPoint} = this.state;

            // 判定一开始是在右下角点击的
            if (
                mouseDownPoint.x > mouseDownPoint.domMinX &&
                mouseDownPoint.x < mouseDownPoint.domMaxX &&
                mouseDownPoint.y > mouseDownPoint.domMinY &&
                mouseDownPoint.y < mouseDownPoint.domMaxY
            ) {
                // resizing
                this.setState({
                    inDragging: false,
                    editing: true
                });
                // console.log('开始改变大小了');
            } else {
                e.preventDefault();
                //判定为移动dom
                this.setState({
                    inDragging: true,
                    editing: true
                });

                let oViewportDom = getDom('.viewport-content')[0],
                    oViewportDomRect = oViewportDom.getBoundingClientRect(),
                    style = Object.assign({}, this.props.attr.style),
                    _flag = false,
                    oItemRefs = getDom('.viewport-content')[0].childNodes,
                    axis = {
                        x: [0, 320],
                        y: [0, 440]
                    },
                    curOffset = {
                        x: this.domRef.offsetLeft,
                        y: this.domRef.offsetTop
                    };

                style.left = e.pageX - oViewportDomRect.x - mouseDownPoint.diffX;
                style.top = e.pageY - oViewportDomRect.y - mouseDownPoint.diffY + oViewportDom.scrollTop;

                [...oItemRefs].map(val => {
                    if (val !== this.domRef) {
                        axis.x.push(val.offsetLeft);
                        axis.x.push(val.offsetLeft + val.offsetWidth);
                        axis.y.push(val.offsetTop);
                        axis.y.push(val.offsetTop + val.offsetHeight);
                    }
                });

                console.log(curOffset);

                axis.x.map(val => {
                    if ((Math.abs(val - curOffset.x)) < 5) {
                        style.left = val;
                        _flag = true;
                    }
                });

                /*if (!_flag) {
                    axis.y.map(val => {
                        _flag = true;
                    });
                }*/
                // addAxis
                // 距离取绝对值
                /*
                const absX = parseInt(Math.abs(this.domRef.offsetLeft)),
                    absY = parseInt(Math.abs(this.domRef.offsetTop));

                //边缘靠近吸附
                if (absX === 5) {
                      pos.left = 0;
                      _flag = true;
                  }
                  if (absY === 5) {
                      pos.top = 0;
                      _flag = true;
                  }
                */
                this.props.dispatch(modifyViewPortItem({
                    id: this.props.attr.id,
                    style
                }));

                // 吸附后释放鼠标事件
                // if (_flag) this.handleMouseUp();
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
                x: e.pageX,
                y: e.pageY,
                diffX: e.pageX - _rect.x,
                diffY: e.pageY - _rect.y,
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
            mouseDown: false,
            inDragging: false,
            inResizing: false,
            editing: false
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
                inResizing: false
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
                console.log(_currentStyle.width, _currentStyle.width / baseViewWidth);
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