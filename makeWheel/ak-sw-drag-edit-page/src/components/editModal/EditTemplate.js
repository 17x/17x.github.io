import React, {Component} from 'react';
import {connect} from 'react-redux';

import {withStyles} from 'material-ui';
import TextField from 'material-ui/TextField';
import Tooltip from 'material-ui/Tooltip';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import IconClose from 'material-ui-icons/Close';
import IconSave from 'material-ui-icons/Save';
import IconDelete from 'material-ui-icons/Delete';

import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from 'material-ui/Dialog';

import {closeEditModal, addItemToTemplate, modifyTemplate, deleteTemplateItem} from 'actions';
import styles from './style';

class EditTemplate extends Component {
    constructor(props) {
        super(props);
    }

    state = ({
        openDeleteDialog: false,
        templateText: this.props.item.templateText || '模板1'
    });

    handleClose() {
        this.props.dispatch(closeEditModal());
    }

    handleApply = () => {
        const {manipulation, item} = this.props;
        if (manipulation === 'add') {
            this.props.dispatch(addItemToTemplate({
                template: item,
                templateText: this.state.templateText
            }));
        } else {
            this.props.dispatch(modifyTemplate({
                ...item,
                templateText: this.state.templateText
            }));
        }
        this.handleClose();
    };

    handleDelete = () => {
        this.props.dispatch(deleteTemplateItem(this.props.item));
        this.handleClose();
    };

    render() {
        const {classes, item, manipulation} = this.props;
        const {templateText} = this.state;
        // console.log('item', item);

        return <form className={classes.root}
                     onSubmit={(e) => {e.preventDefault() && this.handleApply();}}>
            <Tooltip title='放弃修改或关闭' placement='left' disableTriggerFocus={true}>
                <IconButton fab='true'
                            onClick={() => this.handleClose()}
                            className={classes.buttonClose}>
                    <IconClose />
                </IconButton>
            </Tooltip>
            <h2 className={classes.title}>{manipulation === 'add' ? '添加模板' : '编辑模板'}</h2>
            <TextField autoFocus={true}
                       className={classes.textField}
                       label={'模板名称'}
                       title={'模板名称'}
                       margin="normal"
                       fullWidth={true}
                       onChange={(event) => this.setState({templateText: event.target.value})}
                       autoComplete={'off'}
                       defaultValue={templateText}
            />
            <div className={classes.buttonsWrap}>
                <Tooltip title='保存并关闭浮层'
                         placement='top'
                         disableTriggerFocus={true}
                         children={
                             <Button raised
                                     dense
                                     fab
                                     mini
                                     disabled={templateText.trim().length <= 0}
                                     color='primary'
                                     type={'submit'}
                                     onClick={() => this.handleApply()}
                                     children={<IconSave />} />
                         }>

                </Tooltip>
                {
                    manipulation === 'edit' && <Tooltip title='删除这个项目'
                                                        placement='top'
                                                        disableTriggerFocus={true}
                                                        children={
                                                            <Button raised
                                                                    dense
                                                                    fab
                                                                    mini
                                                                    color='accent'
                                                                    onClick={() => this.setState({openDeleteDialog: true})}
                                                                    children={<IconDelete />} />
                                                        } />
                }
            </div>
            <Dialog open={this.state.openDeleteDialog}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description">
                <DialogTitle children={'请确认'} />
                <DialogContent children={
                    <DialogContentText id="alert-dialog-slide-description"
                                       children={'确定要删除这个项目吗？'} />
                } />
                <DialogActions>
                    <Button raised
                            dense
                            color="primary"
                            onClick={() => this.setState({openDeleteDialog: false})}
                            children={'返回'} />
                    <Button raised
                            dense
                            color="accent"
                            onClick={() => this.handleDelete()}
                            children={'删除'} />
                </DialogActions>
            </Dialog>
        </form>;
    }
}

const mapStateToProps = (templateList) => ({templateList});
let EditTemplateComp = connect(mapStateToProps)(EditTemplate);

export default withStyles(styles)(EditTemplateComp);
