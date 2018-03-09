import React, {Component} from 'react';
import {withStyles} from 'material-ui';
import styles from './style';
import {connect} from 'react-redux';
import Slider from '../models/Slider';

class PreviewContentItem extends Component {
    constructor(props) {
        super(props);
    }

    state = ({});

    handleMouseDown(e) {
    }

    componentDidMount() {}

    render() {
        const {classes, attr} = this.props;
        //console.log(attr);
        return <div className={classes.root}
                    style={{
                        ...attr.style,
                        lineHeight: attr.style.lineHeight ? attr.style.lineHeight.toString() + 'px' : 'normal',
                        cursor: 'normal',
                        fontSize: attr.modelType === 'textField' ? attr.style.fontSize + 'em' : attr.style.fontSize
                    }}>
            {
                attr.subImg &&
                <img src={attr.subImg}
                     className={[classes.subImg, attr.subImgStretch ? classes.subImgStretch : ' '].join(' ')} />
            }
            {
                attr.modelType === 'textField' && attr.text && <p>{attr.text}</p>
            }
            {
                attr.modelType === 'productList' && <p>产品列表</p>
            }
            {
                attr.carousel && <Slider slide={attr.carousel} classes={classes} />
            }
        </div>;
    }
}

let PreviewContentItemCom = connect()(PreviewContentItem);
export default withStyles(styles)(PreviewContentItemCom);
