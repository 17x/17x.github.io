import React, {Component} from 'react';
import {withStyles} from 'material-ui';
import {connect} from 'react-redux';
import 'javascript-detect-element-resize';

// todo  简化引入 referer  Minimizing Bundle Size 与 webpack optimize
import {
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider
} from 'material-ui';
import IconAdd from 'material-ui-icons/Add';

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
    commonItem: {
        height: 64,
        textAlign: 'center',
        paddingTop: 0,
        paddingBottom: 0
    },
    commonHeight: {},
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
    },
    subItem: {
        paddingTop: 0,
        paddingBottom: 0
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
        const {attr, classes} = this.props;
        console.log(classes);
        return <div className={classes.item}
                    ref={dom => this.domRef = dom}
                    style={{width: attr.width}}>
            <span onClick={() => this.handleItemClick(this.props.attr.id)}
                  className={classes.holderSpan}>{attr.text}</span>
            <List className={classes.subWrap}
                  disablePadding={true}>
                <ListItem button={true}
                          dense={true}
                          className={classes.commonItem}
                          children={'添加'} />
                <Divider />
                {
                    attr.sub.length > 0 &&
                    attr.sub.map((val, index) =>
                        <ListItem button={true}
                                  dense={true}
                                  key={index}
                                  className={classes.commonItem}
                                  onClick={(id) => this.handleSubClick(id)}>{val.text}</ListItem>
                    )
                }
            </List>
        </div>;
    }
}

let FooterItemComp = connect()(FooterItem);
export default withStyles(styles)(FooterItemComp);