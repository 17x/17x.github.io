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

import {closeEditModal, deleteViewPortItem, modifyViewFooter} from 'actions';
import styles from './style';

import {footTextFieldLists} from './textFieldLists';

class EditFootForm extends Component {
    constructor(props) {
        super(props);
    }

    state = ({
        refs: {},
        openDeleteDialog: false
    });

    handleClose() {
        this.props.dispatch(closeEditModal());
    }

    handleSave() {
        this.handleApply();
        this.handleClose();
    }

    handleApply = () => {
        let attr = {};

        for (let i in this.state.refs) {
            if (i === 'sort') {
                attr[i] = Number(this.state.refs[i].value.trim());
                //console.log('sort', attr[i]);
            } else {
                attr[i] = this.state.refs[i].value.trim();
            }
        }

        if (this.props.isSub) {
            this.props.dispatch(modifyViewFooter(true, {
                id: this.props.footId,
                item: {
                    ...this.props.item,
                    ...attr
                }
            }));
        } else {
            this.props.dispatch(modifyViewFooter(false, {
                id: this.props.item.id,
                modelType: 'foot-item',
                text: this.state.refs['text'].value.trim(),
                sort: this.state.refs['sort'].value.trim(),
                url: this.state.refs['url'].value.trim(),
                sub: this.props.item.sub
            }));
        }
    };

    handleDelete() {
        this.props.dispatch(deleteViewPortItem(this.props.item.id));
        this.handleClose();
    }

    render() {
        const {classes, item} = this.props,
            defaultValues = {};

        footTextFieldLists.map(val => {
            defaultValues[val.id] = item[val.id].toString();
        });

        return <form className={classes.root}>
            <Tooltip title='放弃修改或关闭' placement='left'>
                <IconButton fab='true'
                            onClick={() => this.handleClose()}
                            className={classes.buttonClose}>
                    <IconClose />
                </IconButton>
            </Tooltip>
            <h2 className={classes.title}>编辑</h2>
            {footTextFieldLists.map((val, index) =>
                <TextField key={index}
                           className={classes.textField}
                           label={val.label}
                           title={val.title}
                           margin="normal"
                           inputRef={(dom) => this.state.refs[val.id] = dom}
                           autoComplete={'off'}
                           defaultValue={defaultValues[val.id]}
                />)
            }
            <div className={classes.buttonsWrap}>
                <Tooltip title='保存并关闭浮层'
                         placement='top'
                         children={
                             <Button raised
                                     dense
                                     fab
                                     mini
                                     color='primary'
                                     onClick={() => this.handleSave()}
                                     children={<IconSave />} />
                         }>

                </Tooltip>
                <Tooltip title='删除这个项目'
                         placement='top'
                         children={
                             <Button raised
                                     dense
                                     fab
                                     mini
                                     color='accent'
                                     onClick={() => this.setState({openDeleteDialog: true})}
                                     children={<IconDelete />} />
                         } />
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

const mapStateToProps = ({footList}) => ({footList});
let EditFootFormComp = connect(mapStateToProps)(EditFootForm);
export default withStyles(styles)(EditFootFormComp);
