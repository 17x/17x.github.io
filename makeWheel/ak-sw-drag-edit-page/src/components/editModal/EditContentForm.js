import React, {Component} from 'react';
import {connect} from 'react-redux';

import {withStyles} from 'material-ui';
import TextField from 'material-ui/TextField';
import Tooltip from 'material-ui/Tooltip';
import Button from 'material-ui/Button';
import {FormControlLabel, FormGroup} from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import IconButton from 'material-ui/IconButton';
import IconClose from 'material-ui-icons/Close';
import IconDone from 'material-ui-icons/Done';
import IconDelete from 'material-ui-icons/Delete';
import IconSave from 'material-ui-icons/Save';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from 'material-ui/Dialog';

import {closeEditModal, modifyViewPortItem, deleteViewPortItem} from 'actions';
import styles from './style';
import typeCheck from 'utils/typeCheck';
import {contentTextFieldLists} from './textFieldLists';

class EditForm extends Component {
    constructor(props) {
        super(props);
    }

    state = ({
        refs: {},
        openDeleteDialog: false,
        subImgStretch: this.props.item.subImgStretch
    });

    componentDidMount() {
    }

    handleClose() {
        this.props.dispatch(closeEditModal());
    }

    handleSave() {
        this.handleApply();
        this.handleClose();
    }

    handleApply = () => {
        let item = Object.assign({}, this.props.item),
            modifiedStyle = {},
            addonProps = {};

        for (let i in this.state.refs) {

            switch (i) {
                case 'width':
                case 'height':
                case 'left':
                case 'top':
                case 'right':
                case 'bottom':
                    let val = this.state.refs[i].value.trim();
                    //console.log(typeCheck(val));
                    // 百分比
                    if (typeCheck(val) === 'String' && val.indexOf('%') === -1 && val !== '') {
                        modifiedStyle[i] = Number(val);
                    } else {
                        modifiedStyle[i] = val;
                    }
                    //console.log(modifiedStyle[i]);
                    break;
                case 'background':
                    modifiedStyle[i] = this.state.refs[i].value.trim();
                    break;
                case 'zIndex':
                    modifiedStyle[i] = Number(this.state.refs[i].value.trim());
                    break;
                case 'url':
                case 'subImg':
                case 'text':
                    addonProps[i] = this.state.refs[i].value.trim();
                    break;
                default:
                    break;
            }
        }

        switch (item.modelType) {
            case 'square':
            case 'rectangle':
                addonProps.subImgStretch = this.state.subImgStretch;
                break;
            case 'carousel':
                break;
            default:
                throw new Error('unknown model type. please checking you pass on ');
        }

        this.props.dispatch(modifyViewPortItem({
            ...this.props.item,
            style: {
                ...this.props.item.style,
                ...modifiedStyle
            },
            ...addonProps
        }));
    };

    handleDelete() {
        this.props.dispatch(deleteViewPortItem(this.props.item.id));
        this.handleClose();
    }

    render() {
        let {classes, item} = this.props,
            values = contentTextFieldLists.map(val => {
                let i = val.id,
                    returnVal = null;

                switch (i) {
                    case 'width':
                    case 'height':
                    case 'left':
                    case 'top':
                    case 'right':
                    case 'bottom':
                    case 'background':
                    case 'zIndex':
                        let value = item.style[val.id];
                        if (typeCheck(value) === 'Null' || typeCheck(value) === 'Undefined') {
                            value = '';
                        } else {
                            value = value.toString();
                        }

                        returnVal = value;
                        break;
                    case 'url':
                    case 'subImg':
                    case 'text':
                        returnVal = item[i];
                        break;
                    default:
                        break;
                }

                return {
                    ...val,
                    value: returnVal
                };
            });

        return <form name="EditContentForm" className={classes.root}
                     onSubmit={(e) => {e.preventDefault() && this.handleSave();}}>
            <Tooltip title='放弃修改或关闭' placement='left' disableTriggerFocus={true}>
                <IconButton fab='true'
                            onClick={() => this.handleClose()}
                            className={classes.buttonClose}>
                    <IconClose />
                </IconButton>
            </Tooltip>
            <h2 className={classes.title}>编辑</h2>
            <div className={classes.textFieldWrap}>
                {
                    values.map((val, index) =>
                        val.id === 'subImgStretch' ?
                            <FormControlLabel key={index}
                                              label="图片拉伸"
                                              control={
                                                  <Switch
                                                      checked={this.state.subImgStretch}
                                                      onChange={(event, checked) => this.setState({subImgStretch: checked})}
                                                  />
                                              } />
                            : <TextField key={index}
                                         autoFocus={val.id === 'width'}
                                         className={classes.textField}
                                         label={val.label}
                                         title={val.title}
                                         fullWidth={
                                             val.id === 'background' ||
                                             val.id === 'url' ||
                                             val.id === 'subImg' ||
                                             val.id === 'subImgStretch'
                                         }
                                         margin="normal"
                                         inputRef={(dom) => this.state.refs[val.id] = dom}
                                         defaultValue={val.value}
                                         autoComplete={'off'}
                            />)
                }
            </div>
            <div className={classes.buttonsWrap}>
                <Tooltip title='保存并关闭浮层'
                         placement='top'
                         className={classes.buttonSave}
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
                         } />
                <Tooltip title='删除这个项目'
                         placement='top'
                         className={classes.buttonApply}
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
                <Tooltip title='应用更改'
                         placement='top'
                         className={classes.buttonApply}
                         disableTriggerFocus={true}
                         children={
                             <Button raised
                                     dense
                                     fab
                                     mini
                                     color='primary'
                                     onClick={() => this.handleApply()}
                                     children={<IconDone />} />
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

let EditFormComp = connect()(EditForm);
export default withStyles(styles)(EditFormComp);