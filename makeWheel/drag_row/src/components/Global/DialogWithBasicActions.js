import React, {Component} from 'react';

import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';

const DialogWithBasicActions = props =>
    <Dialog open={props.open}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description">
        <DialogTitle children={props.title} />
        <DialogContent children={
            <DialogContentText id="alert-dialog-slide-description"
                               children={props.content} />
        } />
        <DialogActions>
            <Button raised
                    dense
                    color="primary"
                    onClick={() => props.cancelAction()}
                    children={props.cancelText} />
            <Button raised
                    dense
                    color="accent"
                    onClick={() => props.ensureAction()}
                    children={props.ensureText} />
        </DialogActions>
    </Dialog>;

export default DialogWithBasicActions;