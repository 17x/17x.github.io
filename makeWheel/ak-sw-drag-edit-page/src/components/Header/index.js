import React, {Component} from 'react';
import {connect} from 'react-redux';

import IconButton from 'material-ui/IconButton';
import Menu, {MenuItem} from 'material-ui/Menu';
import {ListItemIcon, ListItemText} from 'material-ui/List';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import IconDelete from 'material-ui-icons/Delete';
import IconSave from 'material-ui-icons/Save';
import Tooltip from 'material-ui/Tooltip';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';

import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from 'material-ui/Dialog';

import {
    clearViewPortItem,
    clearFooterItem,
    showProgressLine,
    hideProgressLine
} from 'actions';

import iosStatusBar from '../../assets/images/ios-statusbar.png';
import axios from 'axios/index';

const optionsInMenu = [
    {text: '清空内容区', code: 'delete-content'},
    {text: '清空底部', code: 'delete-foot'},
    {text: '清空全部', code: 'delete-all'}
];

class AppHeader extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        anchorEl: null,
        open: false,
        showSaveDialog: false,
        openSaveRespSnackbar: false
    };

    handleOpen = event => {
        this.setState({open: true, anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleSave = () => {
        this.props.dispatch(showProgressLine());
        this.setState({showSaveDialog: false});

        setTimeout(() => {
            this.setState({openSaveRespSnackbar: true});
            this.props.dispatch(hideProgressLine());
            setTimeout(() => {
                this.setState({openSaveRespSnackbar: false});
            }, 2000);
        }, 2000);
        /*axios.post('/mock/index.json')
            .then(resp => {
                this.props.dispatch(hideProgressLine());
            });*/
    };

    handleCloseSaveSnackbar() {

    }

    handleItemClick = (code) => {
        switch (code) {
            case 'delete-content':
                this.props.dispatch(clearViewPortItem());
                break;
            case 'delete-foot':
                this.props.dispatch(clearFooterItem());
                break;
            case 'delete-all':
                this.props.dispatch(clearViewPortItem());
                this.props.dispatch(clearFooterItem());
                break;
            default:
                throw new Error('unknown delete code');
        }
        this.setState({open: false});
    };

    render() {
        const {open, showSaveDialog, openSaveRespSnackbar} = this.state;

        return <div className='viewport-header'>
            <img src={iosStatusBar} className='viewport-status-bar' />
            <Tooltip title='保存修改'
                     placement='right'
                     onClick={() => this.setState({showSaveDialog: true})}
                     children={
                         <IconButton children={<IconSave />} />
                     } />
            <h1>TITLE</h1>
            <Tooltip title='更多选项'
                     placement='left'
                     children={
                         <IconButton aria-label="More"
                                     aria-haspopup="true"
                                     onClick={(e) => this.handleOpen(e)}
                                     children={<MoreVertIcon />} />
                     } />
            <Menu id="long-menu"
                  anchorEl={this.state.anchorEl}
                  open={open}
                  autoFocus={false}
                  onBackdropClick={() => this.handleClose()}>
                {
                    optionsInMenu.map((option, index) => (
                        <MenuItem key={index}
                                  selected={option.code === 'delete-content'}
                                  onClick={() => this.handleItemClick(option.code)}>
                            <ListItemIcon children={
                                <IconDelete />
                            } />
                            <ListItemText inset primary={option.text} />
                        </MenuItem>
                    ))
                }
            </Menu>
            <Dialog open={showSaveDialog}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description">
                <DialogTitle children={'请确认'} />
                <DialogContent children={
                    <DialogContentText id="alert-dialog-slide-description"
                                       children={'任何之前的修改将会被保存，确定吗？'} />
                } />
                <DialogActions>
                    <Button raised
                            dense
                            color="normal"
                            onClick={() => this.setState({showSaveDialog: false})}
                            children={'返回'} />
                    <Button raised
                            dense
                            color="primary"
                            onClick={() => this.handleSave()}
                            children={'保存'} />
                </DialogActions>
            </Dialog>
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                open={openSaveRespSnackbar}
                // autoHideDuration={500}
                onClose={() => this.setState({openSaveRespSnackbar: false})}
                SnackbarContentProps={{
                    'aria-describedby': 'message-id'
                }}
                message={<span id="message-id">保存成功</span>}
            />
        </div>;
    }
}

AppHeader = connect()(AppHeader);

export default AppHeader;