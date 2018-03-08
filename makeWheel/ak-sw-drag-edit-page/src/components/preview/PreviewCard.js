import React from 'react';
import {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import ModeEdit from 'material-ui-icons/ModeEdit';
import IconDone from 'material-ui-icons/Done';
import IconButton from 'material-ui/IconButton';

export default ({onPreview,onOut,onApply,item}) => {
    // console.log(item);
    return <ListItem className='preview-item'
                     dense
                     onMouseEnter={() => onPreview(item.id)}
                     onMouseLeave={() => onOut()}>
        <ListItemText primary={item.name} />
        <IconButton title='应用' onClick={() => onApply(item.id)}>
            <ListItemIcon children={<IconDone />} />
        </IconButton>
        {/*<IconButton title='编辑' onClick={() => props.onClick(props.item.id)}>
            <ListItemIcon children={<ModeEdit />} />
        </IconButton>*/}
    </ListItem>;
}