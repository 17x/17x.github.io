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
import {MenuItem} from 'material-ui/Menu';
import {FormControl} from 'material-ui/Form';
import Select from 'material-ui/Select';
import Input, {InputLabel} from 'material-ui/Input';
import {FormControlLabel} from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from 'material-ui/Dialog';

import {closeEditModal, deleteFooterItem, modifyViewFooter} from 'actions';
import styles from './style';

import {footTextFieldLists} from './textFieldLists';

class EditFootForm extends Component {
    constructor(props) {
        super(props);
    }

    state = ({
        refs: {},
        openDeleteDialog: false,
        isRichTextPage: this.props.item.isRichTextPage,
        richPageId: this.props.item.richPageId
    });

    handleRichPageIdSelectChange(event) {
        this.setState({richPageId: event.target.value});
    }

    handleClose() {
        this.props.dispatch(closeEditModal());
    }

    handleSave() {
        this.handleApply();
        this.handleClose();
    }

    handleApply = () => {
        if (this.props.isSub) {
            let attr = {};

            for (let i in this.state.refs) {
                if (i === 'sort') {
                    attr[i] = Number(this.state.refs[i].value.trim());
                    //console.log('sort', attr[i]);
                } else {
                    attr[i] = this.state.refs[i].value.trim();
                }
            }

            attr.isRichTextPage = this.state.isRichTextPage;
            attr.richPageId = this.state.richPageId;

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
                sort: Number(this.state.refs['sort'].value.trim()),
                url: this.state.refs['url'].value.trim(),
                sub: this.props.item.sub,
                isRichTextPage: this.state.isRichTextPage,
                richPageId: this.state.richPageId
            }));
        }
    };

    handleDelete() {
        const {isSub, footId, item} = this.props;

        this.props.dispatch(deleteFooterItem(isSub, footId, isSub ? item.id : null));
        this.handleClose();
    }

    render() {
        const {classes, item, companyList} = this.props,
            defaultValues = {};
        console.log(item);
        footTextFieldLists.map(val => {
            switch (val.id) {
                case 'isRichTextPage':
                    defaultValues[val.id] = item[val.id];
                    break;
                default:
                    defaultValues[val.id] = item[val.id].toString();
            }
        });

        return <form className={classes.root}
                     onSubmit={(e) => {e.preventDefault() && this.handleSave();}}>
            <Tooltip title='放弃修改或关闭' placement='left' disableTriggerFocus={true}>
                <IconButton fab='true'
                            onClick={() => this.handleClose()}
                            className={classes.buttonClose}>
                    <IconClose />
                </IconButton>
            </Tooltip>
            <h2 className={classes.title}>编辑</h2>
            {
                footTextFieldLists.map((val, index) => {
                    switch (val.id) {
                        case 'isRichTextPage':
                            return <FormControlLabel key={index}
                                                     label={val.label}
                                                     control={
                                                         <Switch checked={this.state.isRichTextPage}
                                                                 onChange={(event, checked) => this.setState({isRichTextPage: checked})}
                                                         />
                                                     } />;
                        default:
                            return <TextField key={index}
                                              autoFocus={val.id === 'text'}
                                              className={classes.textField}
                                              label={val.label}
                                              title={val.title}
                                              margin="normal"
                                              fullWidth={true}
                                              inputRef={(dom) => this.state.refs[val.id] = dom}
                                              autoComplete={'off'}
                                              defaultValue={defaultValues[val.id]}
                            />;
                    }
                })
            }
            {
                this.state.isRichTextPage && <FormControl className={classes.switch}>
                    <InputLabel htmlFor="age-simple">企业ID</InputLabel>
                    <Select value={this.state.richPageId}
                            onChange={(event) => this.handleRichPageIdSelectChange(event)}
                            input={<Input name="richPageId" id="age-simple" />}>
                        {
                            companyList.map((val, index) => <MenuItem value={val.id} key={index}>{val.title}</MenuItem>)
                        }
                    </Select>
                </FormControl>
            }
            <div className={classes.buttonsWrap}>
                <Tooltip title='保存并关闭浮层'
                         placement='top'
                         disableTriggerFocus={true}
                         children={
                             <Button raised
                                     dense
                                     fab
                                     mini
                                     color='primary'
                                     type={'submit'}
                                     onClick={() => this.handleSave()}
                                     children={<IconSave />} />
                         }>

                </Tooltip>
                <Tooltip title='删除这个项目'
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

const mapStateToProps = ({footList, companyList}) => ({footList, companyList});
let EditFootFormComp = connect(mapStateToProps)(EditFootForm);
export default withStyles(styles)(EditFootFormComp);
