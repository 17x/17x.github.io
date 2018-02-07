import React, {Component} from 'react';
import {connect} from 'react-redux';

import {withStyles} from 'material-ui';
import TextField from 'material-ui/TextField';
import {FormControlLabel} from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import {MenuItem} from 'material-ui/Menu';
import {FormControl} from 'material-ui/Form';
import Select from 'material-ui/Select';
import Input, {InputLabel} from 'material-ui/Input';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import IconAdd from 'material-ui-icons/Add';
import IconClose from 'material-ui-icons/Close';
import IconDone from 'material-ui-icons/Done';
import IconDelete from 'material-ui-icons/Delete';
import IconSave from 'material-ui-icons/Save';
import InsertPhoto from 'material-ui-icons/InsertPhoto';

import DialogWithBasicActions from '../global/DialogWithBasicActions';
import TooltipWithButtonWithIcon from '../global/TooltipWithButtonWithIcon';

import {closeEditModal, deleteViewPortItem, modifyViewPortItem} from 'actions';
import styles from './style';
import typeCheck from 'utils/typeCheck';

import {editSliderFormLists} from './textFieldLists';
import postMessage from 'utils/postMessage';

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
        editItem: null,
        deletingSlideId: NaN
    });

    componentDidMount() {}

    /*关闭编辑浮层*/
    handleClose() {
        this.props.dispatch(closeEditModal());
    }

    handleSave() {
        this.handleApply();
        this.handleClose();
    }

    handleApply = () => {
        let modifiedStyle = {},
            addonProps = {
                items: this.state.slideItems,
                config: {dots: this.state.dots}
            };

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
            carousel: {
                ...addonProps
            }
        }));
    };

    //删除自身
    handleDelete() {
        this.props.dispatch(deleteViewPortItem(this.props.item.id));
        this.handleClose();
    }

    //删除一个slide
    handleDeleteSlide() {
        //删除后check 正在编辑的ITEM是不是此ITEM
        let {editItem, deletingSlideId, slideItems} = this.state,
            returnState = {
                openDeleteSlideDialog: false,
                deletingSlideId: NaN,
                slideItems: slideItems.filter((val, index) => index !== deletingSlideId)
            };

        if (editItem && editItem.editId === deletingSlideId) {
            returnState.editItem = null;
        }
        this.setState(returnState);
    }

    //完成编辑或添加按钮
    handleEditBtnClick() {
        //console.log(this.state.editItem);
        let slideItems = this.state.slideItems.slice(),
            {editItem} = this.state,
            obj = {
                url: editItem.options.url.value,
                img: editItem.options.img.value,
                isRichTextPage: editItem.options.isRichTextPage.value,
                richPageId: editItem.options.richPageId.value
            };

        if (editItem.type === 'edit') {
            slideItems[editItem.editId] = obj;
        } else {
            slideItems.push(obj);
        }

        this.setState({
            slideItems,
            editItem: null
        });
    }

    //值改变
    handleEditChange = name => (event, checked) => {
        //console.log(name, event, checked);
        //处理react事件销毁
        const newVal = event.target.value;

        this.setState(preState => {
            let editItem = Object.assign({}, preState.editItem),
                {options} = editItem;

            switch (name) {
                case 'isRichTextPage':
                    options[name].value = checked;
                    break;
                // case 'richPageId':
                default :
                    options[name].value = newVal;
            }

            // console.log(options);
            return {
                editItem: {
                    ...editItem,
                    options
                }
            };
        });
    };

    handleChooseImg() {
        postMessage()
            .then(val => {
                //console.log('val', val);
                if (val.suc) {
                    /* this.editItemImg.value = val.cb.smallUrl;
                     this.editItemImg.focus();
                     this.editItemImg.setSelectionRange(0, this.editItemImg.value.length);*/
                    this.handleEditChange('img')({target: {value: val.cb.bigUrl}});
                }
            })
            .catch(err => {/*console.log('err', err);*/});
    }

    // 开始添加
    handleAddSlide() {
        this.setState({
            editItem: {
                type: 'add',
                options: {
                    img: {value: '', label: '图片'},
                    url: {value: '', label: '指向地址'},
                    isRichTextPage: {value: '', label: '指向富文本页面'},
                    richPageId: {value: '', label: '企业ID'}
                }
            }
        });
    }

    // 开始编辑
    handleClickSlide(item, index) {
        this.setState({
            editItem: {
                type: 'edit',
                editId: index,
                options: {
                    img: {value: item.img, label: '图片'},
                    url: {value: item.url, label: '指向地址'},
                    isRichTextPage: {value: item.isRichTextPage, label: '指向富文本页面'},
                    richPageId: {value: item.richPageId, label: '企业ID'}
                }
            }
        });
    }

    render() {
        //console.log(this.props.item);
        let {classes, item, companyList} = this.props,
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
            values = editSliderFormLists.map(val => {
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
                     onSubmit={(e) => {e.preventDefault() && this.handleSave();}}>
            <TooltipWithButtonWithIcon title={'放弃修改或关闭'}
                                       titlePlace={'left'}
                                       btnClass={classes.buttonClose}
                                       btnTag={'iconButton'}
                                       btnClick={() => this.handleClose()}
                                       icon={<IconClose />} />
            <h2 className={classes.title}>编辑 - <small className='color-grey'>轮播图</small></h2>
            <div className={classes.textFieldWrap}>
                {
                    values.map((val, index) =>
                        val.id === 'dots'
                            ? <FormControlLabel key={index}
                                                label={val.label}
                                                className={classes.switchRow}
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
                                  title={val.url}
                                  onClick={() => this.handleClickSlide(val, index)}
                                  onDelete={() => this.setState({
                                      openDeleteSlideDialog: true,
                                      deletingSlideId: index
                                  })}
                            />)
                    }

                    <TooltipWithButtonWithIcon title={'添加一张图片'}
                                               titlePlace={'top'}
                                               btnTag={'button'}
                                               btnType={'button'}
                                               btnClick={() => this.handleAddSlide()}
                                               icon={<IconAdd />} />

                    {
                        editItem &&
                        <div className={classes.editItem}>
                            {
                                Object.keys(editItem.options).map((val, index) => {
                                        //console.log(val);
                                        switch (val) {
                                            case 'isRichTextPage':
                                                return <FormControlLabel key={index}
                                                                         label={editItem.options[val].label}
                                                                         className={classes.switchRow}
                                                                         control={
                                                                             <Switch
                                                                                 checked={editItem.options[val].value}
                                                                                 onChange={this.handleEditChange(val)}
                                                                             />
                                                                         } />;
                                            case 'richPageId':
                                                return null;
                                            case 'img':
                                                return <div key={index} className={classes.textFieldWithImgChoose}>
                                                    <TextField key={index}
                                                               className={classes.textFieldImg}
                                                               id={editItem.options[val].id}
                                                               name={editItem.options[val].id}
                                                               label={editItem.options[val].label}
                                                               fullWidth={true}
                                                               margin="normal"
                                                               onChange={this.handleEditChange(val)}
                                                               value={editItem.options[val].value}
                                                               autoComplete={'off'} />
                                                    <TooltipWithButtonWithIcon title={'选择图片'}
                                                                               titlePlace={'left'}
                                                                               btnColor='default'
                                                                               btnText='选择'
                                                                               btnClass={classes.imgChoose}
                                                                               btnClick={() => this.handleChooseImg()}
                                                                               icon={<InsertPhoto />} />
                                                </div>;
                                            default:
                                                return <TextField key={index}
                                                                  id={editItem.options[val].id}
                                                                  name={editItem.options[val].id}
                                                                  className={classes.textField}
                                                                  label={editItem.options[val].label}
                                                                  fullWidth={true}
                                                                  margin="normal"
                                                                  onChange={this.handleEditChange(val)}
                                                                  value={editItem.options[val].value}
                                                                  autoComplete={'off'} />;
                                        }
                                    }
                                )
                            }
                            {
                                editItem.options.isRichTextPage.value && <FormControl className={classes.switch}>
                                    <InputLabel htmlFor="age-simple">企业ID</InputLabel>
                                    <Select value={editItem.options.richPageId.value}
                                            onChange={this.handleEditChange('richPageId')}
                                            input={<Input name="richPageId" id="age-simple" />}>
                                        {
                                            companyList.map((val, index) => <MenuItem value={val.id}
                                                                                      key={index}>{val.title}</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                            }
                            <br />
                            <Button
                                raised
                                dense
                                mini
                                color='accent'
                                className={classes.formControl}
                                onClick={() => this.handleEditBtnClick()}>
                                {editItem.type === 'add' ? '添加' : '修改'}
                            </Button>

                        </div>
                    }
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

const mapStateToProps = ({companyList}) => ({companyList});

let EditContentSliderComp = connect(mapStateToProps)(EditContentSlider);
export default withStyles(styles)(EditContentSliderComp);