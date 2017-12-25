import React, {Component} from 'react';
import {connect} from 'react-redux';

import {withStyles} from 'material-ui';
import TextField from 'material-ui/TextField';
import Tooltip from 'material-ui/Tooltip';
import Button from 'material-ui/Button';
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
        style: {
            width: '',
            height: '',
            top: '',
            right: '',
            bottom: '',
            left: '',
            background: 'none',
            url: ''
        },
        refs: {},
        openDeleteDialog: false
    });

    componentDidMount() {}

    handleClose() {
        this.props.dispatch(closeEditModal());
    }

    handleSave() {
        this.handleApply();
        this.handleClose();
    }

    handleApply = () => {
        let styles = {};

        for (let i in this.state.refs) {
            //console.log(this.state.refs[i].value);
            styles[i] = this.state.refs[i].value.trim();

            switch (i) {
                case 'width':
                case 'height':
                case 'top':
                case 'right':
                case 'bottom':
                case 'left':
                    // 百分比
                    if (styles[i].indexOf('%') === -1 && styles[i] !== '') {
                        styles[i] = Number(styles[i]);
                    }
                    break;
                default:
                    break;
            }
        }
        //console.log(styles)
        // console.log(styles);

        let style = {
            ...Object.assign({}, this.props.item.style),
            ...styles
        };
        this.props.dispatch(modifyViewPortItem({id: this.props.item.id, style}));
    };

    handleDelete() {
        this.props.dispatch(deleteViewPortItem(this.props.item.id));
        this.handleClose();
    }

    render() {
        let {classes, item} = this.props,
            defaultValues = Object.assign({}, item.style);

        // console.log(defaultValues);

        for (let i in defaultValues) {
            if (typeCheck(defaultValues[i]) === 'Null' || typeCheck(defaultValues[i]) === 'Undefined') {
                defaultValues[i] = '';
            } else {
                defaultValues[i] = defaultValues[i].toString();
            }
        }

        return <form className={classes.root}>
            <Tooltip title='放弃修改或关闭' placement='left'>
                <IconButton fab='true'
                            onClick={() => this.handleClose()}
                            className={classes.buttonClose}>
                    <IconClose />
                </IconButton>
            </Tooltip>
            <h2 className={classes.title}>编辑</h2>
            {
                contentTextFieldLists.map((val, index) =>
                    <TextField key={index}
                               className={classes.textField}
                               label={val.label}
                               title={val.title}
                               margin="dense"
                               inputRef={(dom) => this.state.refs[val.id] = dom}
                               defaultValue={defaultValues[val.id]}
                               autoComplete={'off'}
                    />)
            }
            <div className={classes.buttonsWrap}>
                <Tooltip title='保存并关闭浮层'
                         placement='top'
                         className={classes.buttonSave}
                         children={
                             <Button raised
                                     dense
                                     fab
                                     mini
                                     color='primary'
                                     onClick={() => this.handleSave()}
                                     children={<IconSave />} />
                         } />
                <Tooltip title='删除这个项目'
                         placement='top'
                         className={classes.buttonApply}
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