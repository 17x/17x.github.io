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
    hideProgressLine,
    deleteOutViewport, openEditModal
} from 'actions';

import iosStatusBar from '../../assets/images/ios-statusbar.png';
import axios from 'axios/index';
import qs from 'qs';
import on from 'utils/on';
import off from 'utils/off';

const optionsInMenu = [
        {text: '清空内容区', code: 'delete-content'},
        {text: '清空底部', code: 'delete-foot'},
        {text: '清空全部', code: 'delete-all'},
        {text: '清空内容区域左右侧多余元素', code: 'delete-out-viewport'},
        {text: '保存为模板', code: 'save-as-template'}
        // {text: '预置模板', code: 'prev-tpls'}
    ],
    doc = document;

const mapStateToProps = ({viewportList, footList, templateList}) => ({viewportList, footList, templateList});
@connect(mapStateToProps)
class AppHeader extends Component {
    constructor(props) {
        super(props);
        this.onSaveCapture = this.onSaveCapture.bind(this);
    }

    state = {
        anchorEl: null,
        openMenu: false,
        showDialog: false,
        showSnack: false,
        saveCbString: ''
    };

    handleMenuOpen = event => {
        this.setState({openMenu: true, anchorEl: event.currentTarget});
    };

    handleMenuClose = () => {
        this.setState({openMenu: false});
    };

    handleSnackClose = () => {
        this.setState({
            showSnack: false
        });
    };

    componentWillUnmount() {
        off(doc, 'keydown', this.onSaveCapture, false);
    }

    componentDidMount() {
        on(doc, 'keydown', this.onSaveCapture, false);
    }

    //快捷键保存
    onSaveCapture(e) {
        if (e.keyCode === 83 && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)) {
            e.preventDefault();
            this.handleSave();
        }
    }

    handleSave = () => {
        this.props.dispatch(showProgressLine());
        this.setState({showDialog: false});

        let dataToUpdate = {
                viewportList: this.props.viewportList,
                footList: this.props.footList
            },
            templateList = this.props.templateList;

        axios.post('updatePageHtmlString.html', qs.stringify({
            code: location.search.split('=')[1],
            str: JSON.stringify(dataToUpdate)
        })).then(resp => {
            this.props.dispatch(hideProgressLine());
            this.setState({
                saveCbString: resp.data.ok ? '保存成功' : resp.data.value,
                showSnack: true
            });
        });

    };

    handleMenuItemClick = (code) => {
        this.setState({openMenu: false});
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
            case 'delete-out-viewport':
                this.props.dispatch(deleteOutViewport());
                break;
            case 'save-as-template':
                this.props.dispatch(openEditModal('add', 'template'));
                break;
            default:
                throw new Error('unknown manipulation code');
        }
    };

    render() {
        const {openMenu, showDialog, showSnack, saveCbString} = this.state;

        return <div className='viewport-header'>
            <img src={iosStatusBar} className='viewport-status-bar' />
            <Tooltip title='保存修改'
                     disableTriggerFocus={true}
                     placement='right'
                     children={
                         <IconButton onClick={() => this.setState({showDialog: true})}
                                     children={<IconSave />} />
                     } />
            <h1></h1>
            <Tooltip title='更多选项'
                     placement='left'
                     disableTriggerFocus={true}
                     children={
                         <IconButton onClick={(e) => this.handleMenuOpen(e)}
                                     children={<MoreVertIcon />} />
                     } />
            <Menu id="long-menu"
                  anchorEl={this.state.anchorEl}
                  open={openMenu}
                  autoFocus={false}
                  onBackdropClick={this.handleMenuClose}>
                {
                    optionsInMenu.map((option, index) => (
                        <MenuItem key={index}
                            // selected={option.code === 'delete-content'}
                                  onClick={() => this.handleMenuItemClick(option.code)}>
                            <ListItemIcon children={
                                <IconDelete />
                            } />
                            <ListItemText inset primary={option.text} />
                        </MenuItem>
                    ))
                }
            </Menu>
            <Dialog open={showDialog}
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
                            color="default"
                            onClick={() => this.setState({showDialog: false})}
                            children={'返回'} />
                    <Button raised
                            dense
                            color="primary"
                            onClick={this.handleSave}
                            children={'保存'} />
                </DialogActions>
            </Dialog>
            <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                      open={showSnack}
                      onClose={this.handleSnackClose}
                      autoHideDuration={1500}
                      SnackbarContentProps={{
                          'aria-describedby': 'message-id'
                      }}
                      message={<span id="message-id">{saveCbString}</span>} />

        </div>;
    }
}


export default AppHeader;