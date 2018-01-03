import React from 'react';

import Tooltip from 'material-ui/Tooltip';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';

const TooltipWithButtonWithIcon = props =>
    <Tooltip title={props.title} placement={props.titlePlace} disableTriggerFocus={true}>

        {
            props.btnTag === 'iconButton'
                ? <IconButton fab={'true'}
                              color={props.btnColor}
                              type={props.btnType || 'button'}
                              onClick={() => props.btnClick()}
                              className={props.btnClass}
                              children={props.icon} />
                : <Button raised
                          dense
                          fab
                          mini
                          color={props.btnColor}
                          type={props.btnType || 'button'}
                          onClick={() => props.btnClick()}
                          className={props.btnClass}
                          children={props.icon} />
        }
    </Tooltip>;

export default TooltipWithButtonWithIcon;