import React, {Component} from 'react';
import {withStyles} from 'material-ui';
import {connect} from 'react-redux';
import 'javascript-detect-element-resize';

import {openEditModal} from '../../actions';
import getDom from '../../assets/util/getDom';
import FooterSubItem from './FooterSubItem';

const styles = {
    item: {
        height: '100%',
        float: 'left',
        lineHeight: '64px',
        textAlign: 'center',
        position: 'relative',
        '&:after': {
            content: '" "',
            position: 'absolute',
            top: 0,
            right: 0,
            height: '100%',
            borderRight: '1px solid #dfdfdf'
        },
        '&:hover ul': {
            display: 'block'
        }
    },
    holderSpan: {
        display: 'block',
        width: '100%',
        height: '100%'
    },
    subWrap: {
        backgroundColor: '#fff',
        width: '100%',
        display: 'none',
        position: 'absolute',
        bottom: 64
    }
};

class FooterItem extends Component {
    constructor(props) {
        super(props);
    }

    state = ({});

    handleItemClick(id) {
        this.props.dispatch(openEditModal('edit', 'foot', id));
    }

    handleSubClick(id) {
        this.props.dispatch(openEditModal('edit', 'foot-sub', this.props.attr.id, id));
    }

    componentDidMount() {

    }

    render() {
        // console.log(this.props.attr);
        const {attr, classes, editAbleStyle} = this.props;
        return <div className={classes.item}
                    ref={dom => this.domRef = dom}
                    style={{...attr.style, ...editAbleStyle}}>
            <span onClick={(id) => this.handleItemClick(this.props.attr.id)}
                  className={classes.holderSpan}>{attr.text}</span>
            {
                attr.modelType === 'menu' &&
                <ul className={classes.subWrap}>
                    {attr.sub.map((val, index) =>
                        <FooterSubItem attr={val} key={index} onClick={(id) => this.handleSubClick(id)} />
                    )}
                </ul>}
        </div>;
    }
}

let FooterItemComp = connect()(FooterItem);
export default withStyles(styles)(FooterItemComp);