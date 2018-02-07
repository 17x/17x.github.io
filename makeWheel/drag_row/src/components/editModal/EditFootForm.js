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
import InsertPhoto from 'material-ui-icons/InsertPhoto';
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

import TooltipWithButtonWithIcon from '../global/TooltipWithButtonWithIcon';

import {closeEditModal, deleteFooterItem, modifyViewFooter} from 'actions';
import styles from './style';

import {footFormLists} from './textFieldLists';
import postMessage from 'utils/postMessage';

class EditFootForm extends Component {
    constructor(props) {
        super(props);
    }

    state = ({
        openDeleteDialog: false,
        isRichTextPage: this.props.item.isRichTextPage,
        richPageId: this.props.item.richPageId
    });

    handleRichPageIdSelectChange(event) {
        this.setState({richPageId: event.target.value});
    }

    handleChooseImg(keyName) {
        postMessage()
            .then(val => {
                console.log('val', val);
                if (val.suc) {
                    this[keyName].value = val.cb.smallUrl;
                    this[keyName].focus();
                    this[keyName].setSelectionRange(0, this.icon.value.length);
                }
            })
            .catch(err => {console.log('err', err);});
    }

    handleClose() {
        this.props.dispatch(closeEditModal());
    }

    handleSave() {
        this.handleApply();
        this.handleClose();
    }

    handleApply = () => {
        let arr = [
                'text',
                'sort',
                'url',
                'icon'
            ],
            attr = {};

        this.props.isSub && (arr.length = 3);

        arr.map(val => {
            attr[val] = val === 'sort' ? Number(this[val].value.trim()) : this[val].value.trim();
            /*if (val === 'sort') {
                attr[val] = Number(this[val].value.trim());
            } else {
                attr[val] = this[val].value.trim();
            }*/
        });

        attr.isRichTextPage = this.state.isRichTextPage;
        attr.richPageId = this.state.richPageId;

        if (this.props.isSub) {
            this.props.dispatch(modifyViewFooter(true, {
                id: this.props.footId,
                item: {
                    ...this.props.item,
                    ...attr
                }
            }));
        } else {
            // console.log(attr);
            attr.sub = this.props.item.sub;
            this.props.dispatch(modifyViewFooter(false, {
                id: this.props.item.id,
                modelType: 'foot-item',
                ...attr
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
        // console.log(item);

        item.icon = item.icon || '';
        footFormLists.map((val, index) => {
            footFormLists[index].icon = footFormLists[index].icon || '';
            switch (val.id) {
                case 'isRichTextPage':
                    defaultValues[val.id] = item[val.id];
                    break;
                default:
                    if (this.props.isSub && val.id === 'icon') return null;

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
                footFormLists.map((val, index) => {

                    switch (val.id) {
                        case 'isRichTextPage':
                            return <FormControlLabel key={index}
                                                     label={val.label}
                                                     control={
                                                         <Switch checked={this.state.isRichTextPage}
                                                                 onChange={(event, checked) => this.setState({isRichTextPage: checked})}
                                                         />
                                                     } />;
                        case 'icon':
                            if (this.props.isSub) return null;
                            return <div key={index} className={classes.textFieldWithImgChoose}>
                                <TextField
                                    className={classes.textFieldImg}
                                    label={val.label}
                                    title={val.title}
                                    id={val.id}
                                    type={'text'}
                                    margin={'dense'}
                                    fullWidth={true}
                                    inputRef={(dom) => this[val.id] = dom}
                                    defaultValue={defaultValues[val.id]}
                                    autoComplete={'off'} />
                                <TooltipWithButtonWithIcon title={'选择图片'}
                                                           titlePlace={'left'}
                                                           btnColor='default'
                                                           btnText='选择'
                                                           btnClass={classes.imgChoose}
                                                           btnClick={() => this.handleChooseImg(val.id)}
                                                           icon={<InsertPhoto />} />
                            </div>;
                        default:
                            return <TextField key={index}
                                              autoFocus={val.id === 'text'}
                                              className={classes.textField}
                                              label={val.label}
                                              title={val.title}
                                              margin="normal"
                                              fullWidth={true}
                                              inputRef={(dom) => this[val.id] = dom}
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
