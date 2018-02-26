import React from 'react';
import {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import ModeEdit from 'material-ui-icons/ModeEdit';
import IconDone from 'material-ui-icons/Done';
import IconButton from 'material-ui/IconButton';

export default (props) => {
    // console.log(props);
    return <ListItem className='preview-item' dense onMouseEnter={() => props.onPreview(props.item.id)} onMouseLeave={() => props.onOut()}>
        <ListItemText primary={props.item.templateText} />
        <IconButton title='编辑'>
            <ListItemIcon children={<ModeEdit />}
                          onClick={() => props.onClick(props.item.id)} />
        </IconButton>
        <IconButton title='应用'>
            <ListItemIcon children={<IconDone />}
                          onClick={() => props.onApply(props.item.id)} />
        </IconButton>
    </ListItem>;
}