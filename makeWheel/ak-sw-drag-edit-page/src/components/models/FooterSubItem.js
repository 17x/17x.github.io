import React, {Component} from 'react';
import {withStyles} from 'material-ui';
import {connect} from 'react-redux';
import 'javascript-detect-element-resize';

import {openEditModal} from '../../actions';

const styles = {
    item: {
        display: 'block',
        width: '100%',
        height: '64px',
        lineHeight: '64px',
        textAlign: 'center',
        position: 'relative',
        border: '1px solid #dfdfdf',
        borderBottom: 'none'
    }
};

class FooterSubItem extends Component {
    constructor(props) {
        super(props);
    }

    state = ({});

    componentDidMount() {

    }

    render() {
        const {attr} = this.props;
        return <li className={this.props.classes.item}
                   ref={dom => this.domRef = dom}
                   onClick={() => this.props.onClick(attr.id)}
                   style={{...this.props.attr.style}}>
            {attr.text}
        </li>;
    }
}

let FooterSubItemComp = connect()(FooterSubItem);
export default withStyles(styles)(FooterSubItemComp);