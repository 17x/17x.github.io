import React, {Component} from 'react';
import {withStyles} from 'material-ui';
import {connect} from 'react-redux';
import 'javascript-detect-element-resize';

import {openEditModal} from '../../actions';
import getDom from '../../assets/util/getDom';

const styles = {
    root: {
        background: 'red',
        '&:after': {
            content: '" "',
            position: 'absolute',
            display: 'block',
            width: 10,
            height: 10,
            right: 0,
            bottom: 0,
            cursor: 'nwse-resize'
        }
    }
};

class ContentItem extends Component {
    constructor(props) {
        super(props);
    }

    state = ({
        mouseDown: false,
        inDragging: false,
        inResizing: false,
        // 鼠标按下时的坐标信息与dom坐标的差值
        mouseDownPoint: {},
        editAbleStyle: {}
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
                    inResizing: true
                });
            } else {
                e.preventDefault();
                //判定为移动dom
                this.setState({
                    inDragging: true
                });

                let oViewportDom = getDom('.viewport-content')[0],
                    oViewportDomRect = oViewportDom.getBoundingClientRect(),
                    pos = Object.assign({}, this.state.editAbleStyle),
                    _flag = false;

                pos.left = e.pageX - oViewportDomRect.x - mouseDownPoint.diffX;
                pos.top = e.pageY - oViewportDomRect.y - mouseDownPoint.diffY + oViewportDom.scrollTop;

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
                this.setState({
                    editAbleStyle: pos
                });

                // 吸附后释放鼠标事件
                if (_flag) this.handleMouseUp();
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
            mouseDown: true
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
            inResizing: false
        });
    }

    handleMouseLeave(e) {
        this.setState({
            mouseDown: false,
            inDragging: false,
            inResizing: false
        });
    }

    //捕获鼠标松开事件
    handleClickCapture(e) {
        // 判定为点击
        if (!this.state.inResizing && !this.state.inDragging) {
            this.props.dispatch(openEditModal(this.props.attr.id));
        }
    }

    handleResize() {
        let _firstAutoRun = true;
        // 解决监控插件首次自动运行
        return () => {
            //console.log(this.domRef.getBoundingClientRect());

            let styles = Object.assign({}, this.state.editAbleStyle),
                _currentStyle = this.domRef.getBoundingClientRect();

            styles.width = _currentStyle.width;
            styles.height = _currentStyle.height;

            this.setState({
                inResizing: !_firstAutoRun,
                editAbleStyle: styles
            });

            //console.log(this.state.editAbleStyle);
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
        //console.log(this);
        return <div onMouseDown={(e) => this.handleMouseDown(e)}
                    onMouseMove={(e) => this.handleMouseMove(e)}
                    onMouseUp={(e) => this.handleMouseUp(e)}
                    onMouseLeave={(e) => this.handleMouseLeave(e)}
                    onMouseUpCapture={(e) => this.handleClickCapture(e)}
                    className={this.props.classes.root}
                    ref={dom => this.domRef = dom}
                    style={{...this.props.attr.style, ...this.state.editAbleStyle}}>
            {'ContentItem' + this.props.children}
        </div>;
    }
}

const mapStateToProps = ({})=>{}
let ContentItemCom = connect()(ContentItem);
export default withStyles(styles)(ContentItemCom);