import React from 'react';

import Tooltip from 'material-ui/Tooltip';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';

const TooltipWithButtonWithIcon = props => {
    let OButton = null,
        icon = props.icon;
    switch (props.btnTag) {
        case 'iconButton':
            OButton = <IconButton fab={'true'}
                                  color={props.btnColor}
                                  type={props.btnType || 'button'}
                                  onClick={() => props.btnClick()}
                                  className={props.btnClass}
                                  children={props.icon} />;
            break;
        case 'miniButton':
            OButton = <Button mini={true}
                              color={props.btnColor || 'primary'}
                              type={props.btnType || 'button'}
                              onClick={() => props.btnClick()}
                              className={props.btnClass}>
                {props.icon}
                {props.btnText}
            </Button>;
            break;
        default:
            OButton = <Button raised
                              dense
                              fab
                              mini
                              color={props.btnColor}
                              type={props.btnType || 'button'}
                              onClick={() => props.btnClick()}
                              className={props.btnClass}
                              children={props.icon} />;
    }

    return <Tooltip title={props.title} placement={props.titlePlace} disableTriggerFocus={true}>
        {OButton}
    </Tooltip>;
};

export default TooltipWithButtonWithIcon;