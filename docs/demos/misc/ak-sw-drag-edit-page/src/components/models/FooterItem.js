import React, {Component} from 'react';
import {connect} from 'react-redux';

import {withStyles} from 'material-ui';
import List, {ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

import {openEditModal} from 'actions';
import {styleFooterItem} from './FooterItemStyle';

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

    handleAdd() {
        this.props.dispatch(openEditModal('add', 'foot-sub', this.props.attr.id));
    }

    componentDidMount() {

    }

    render() {
        const {attr, classes} = this.props;

        return <div className={classes.item}
                    ref={dom => this.domRef = dom}
                    title='点击打开编辑框'
                    style={{
                        width: attr.width
                    }}>
            <p onClick={() => this.handleItemClick(this.props.attr.id)}
               className={classes.holderSpan}
               style={{
                   lineHeight: attr.icon ? '20px' : '64px'
               }}>
                {attr.icon && <img className={classes.level1Icon} src={attr.icon} />}
                <span>{attr.text}</span>
            </p>
            <List className={classes.subWrap}
                  disablePadding={true}>
                <ListItem button={true}
                          dense={true}
                          title='点击添加新的子项'
                          className={classes.commonItem}
                          onClick={() => this.handleAdd()}
                          children={'添加'} />
                <Divider />
                {
                    attr.sub.length > 0 &&
                    attr.sub.map((val, index) =>
                        <ListItem button={true}
                                  dense={true}
                                  key={index}
                                  className={classes.commonItem}
                                  onClick={() => this.handleSubClick(val.id)}
                                  children={val.text} />
                    )
                }
            </List>
        </div>;
    }
}

let FooterItemComp = connect()(FooterItem);
export default withStyles(styleFooterItem)(FooterItemComp);