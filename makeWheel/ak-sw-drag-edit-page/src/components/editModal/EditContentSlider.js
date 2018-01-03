import React, {Component} from 'react';
import {connect} from 'react-redux';

import {withStyles} from 'material-ui';
import TextField from 'material-ui/TextField';
import {FormControlLabel} from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import IconClose from 'material-ui-icons/Close';
import IconDone from 'material-ui-icons/Done';
import IconDelete from 'material-ui-icons/Delete';
import IconSave from 'material-ui-icons/Save';

import DialogWithBasicActions from '../global/DialogWithBasicActions';
import TooltipWithButtonWithIcon from '../global/TooltipWithButtonWithIcon';

import {closeEditModal, modifyViewPortItem, deleteViewPortItem} from 'actions';
import styles from './style';
import typeCheck from 'utils/typeCheck';

import {editSliderTextFieldLists} from './textFieldLists';

class EditContentSlider extends Component {
    constructor(props) {
        super(props);
    }

    state = ({
        refs: {},
        openDeleteDialog: false,
        openDeleteSlideDialog: false,
        slideItems: this.props.item.carousel.items,
        dots: this.props.item.carousel.config.dots,
        needDeleteItemIndex: NaN,
        editItem: null
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
        let modifiedStyle = {},
            addonProps = {};

        for (let i in this.state.refs) {
            let val = this.state.refs[i].value.trim();

            switch (i) {
                case 'width':
                case 'height':
                case 'left':
                case 'top':
                case 'right':
                case 'bottom':
                    // 百分比
                    if (typeCheck(val) === 'String' && val.indexOf('%') === -1 && val !== '') {
                        modifiedStyle[i] = Number(val);
                    } else {
                        modifiedStyle[i] = val;
                    }
                    break;
                case 'zIndex':
                    modifiedStyle[i] = Number(val);
                    break;
                default:
                    break;
            }
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

    handleDeleteSlide() {
        //console.log(this.state.needDeleteItemIndex);
    }

    handleClickSlide(item, index) {
        console.log(item);

        this.setState({
            editItem: {
                type: 'edit',
                editId: index,
                refs: {
                    img: null,
                    url: null
                },
                options: [
                    {id: 'img', value: item.img, label: '图片'},
                    {id: 'url', value: item.url, label: '指向地址'}
                ]
            }
        });
    }

    render() {
        //console.log(this.props);
        let {classes, item} = this.props,
            {refs, dots, slideItems, editItem, openDeleteSlideDialog, openDeleteDialog} = this.state,
            tooltips = [
                {
                    title: '保存并关闭浮层',
                    btnType: 'submit',
                    btnColor: 'primary',
                    btnClick: () => this.handleSave(),
                    icon: <IconSave />
                },
                {
                    title: '删除这个项目',
                    btnColor: 'accent',
                    btnClick: () => this.setState({openDeleteDialog: true}),
                    icon: <IconDelete />
                },
                {
                    title: '应用更改',
                    btnColor: 'primary',
                    btnClick: () => this.handleApply(),
                    icon: <IconDone />
                }
            ],
            values = editSliderTextFieldLists.map(val => {
                let i = val.id,
                    returnVal = null;

                switch (i) {
                    case 'width':
                    case 'height':
                    case 'left':
                    case 'top':
                    case 'right':
                    case 'bottom':
                    case 'zIndex':
                        let value = item.style[val.id];
                        if (typeCheck(value) === 'Null' || typeCheck(value) === 'Undefined') {
                            value = '';
                        } else {
                            value = value.toString();
                        }

                        returnVal = value;
                        break;
                    default:
                        break;
                }

                return {
                    ...val,
                    value: returnVal
                };
            });

        return <form name="EditContentForm"
                     className={classes.root}
                     onSubmit={(e) => {alert(999) && e.preventDefault() && this.handleSave();}}>
            <TooltipWithButtonWithIcon title={'放弃修改或关闭'}
                                       titlePlace={'left'}
                                       btnClass={classes.buttonClose}
                                       btnTag={'iconButton'}
                                       btnClick={() => this.handleClose()}
                                       icon={<IconClose />} />
            <h2 className={classes.title}>编辑</h2>
            <div className={classes.textFieldWrap}>
                {
                    values.map((val, index) =>
                        val.id === 'dots'
                            ? <FormControlLabel key={index}
                                                label={val.label}
                                                className={classes.switch}
                                                control={
                                                    <Switch checked={dots}
                                                            onChange={(event, checked) => this.setState({dots: checked})}
                                                    />
                                                } />
                            : <TextField key={index}
                                         autoFocus={val.id === 'width'}
                                         className={classes.textField}
                                         label={val.label}
                                         title={val.title}
                                         fullWidth={
                                             val.id === 'zIndex' ||
                                             val.id === 'dots'
                                         }
                                         margin="normal"
                                         inputRef={(dom) => refs[val.id] = dom}
                                         defaultValue={val.value}
                                         autoComplete={'off'}
                            />)
                }
                <div className={classes.chipsWrap}>
                    {
                        slideItems.map((val, index) =>
                            <Chip key={index}
                                  avatar={
                                      <Avatar src={val.img} className={classes.chipImg} />
                                  }
                                  className={classes.chip}
                                  label={index + 1}
                                  title={val.url}
                                  onClick={() => this.handleClickSlide(val, index)}
                                  onDelete={() => this.setState({
                                      openDeleteSlideDialog: true,
                                      needDeleteItemIndex: index
                                  })}
                            />)
                    }
                    <div>
                        {
                            editItem &&
                            editItem.options.map((val, index) =>
                                <TextField key={index}
                                           className={classes.textField}
                                           label={val.label}
                                           fullWidth={true}
                                           margin="normal"
                                           inputRef={(dom) => refs[val.id] = dom}
                                           defaultValue={val.value}
                                           autoComplete={'off'} />
                            )
                        }
                        {editItem &&
                        <Button
                            raised
                            dense
                            mini
                            onClick={() => this.handleEditBtnClick()}>
                            {editItem.type === 'add' ? '添加' : '修改'}
                        </Button>}
                    </div>
                </div>
            </div>
            <div className={classes.buttonsWrap}>
                {tooltips.map((val, index) =>
                    <TooltipWithButtonWithIcon key={index}
                                               title={val.title}
                                               titlePlace={'top'}
                                               btnTag={'button'}
                                               btnType={val.btnType}
                                               btnColor={val.btnColor}
                                               btnClick={val.btnClick}
                                               icon={val.icon} />
                )}
            </div>
            <DialogWithBasicActions open={openDeleteSlideDialog}
                                    title={'请确认'}
                                    content={'确定要删除这张图片吗？'}
                                    cancelAction={() => this.setState({
                                        openDeleteSlideDialog: false,
                                        needDeleteItemIndex: NaN
                                    })}
                                    cancelText={'返回'}
                                    ensureAction={() => this.handleDeleteSlide()}
                                    ensureText={'删除'} />

            <DialogWithBasicActions open={openDeleteDialog}
                                    title={'请确认'}
                                    content={'确定要删除本项目吗？'}
                                    cancelAction={() => this.setState({openDeleteDialog: false})}
                                    cancelText={'返回'}
                                    ensureAction={() => this.handleDelete()}
                                    ensureText={'删除'} />
        </form>;
    }
}

let EditContentSliderComp = connect()(EditContentSlider);
export default withStyles(styles)(EditContentSliderComp);