import React, {Component} from 'react';
import {connect} from 'react-redux';

import {withStyles} from 'material-ui';
import TextField from 'material-ui/TextField';
import {FormControlLabel} from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import IconClose from 'material-ui-icons/Close';
import IconDone from 'material-ui-icons/Done';
import IconDelete from 'material-ui-icons/Delete';
import IconSave from 'material-ui-icons/Save';
import InsertPhoto from 'material-ui-icons/InsertPhoto';
import {MenuItem} from 'material-ui/Menu';
import {FormControl} from 'material-ui/Form';
import Select from 'material-ui/Select';
import Input, {InputLabel} from 'material-ui/Input';
import DialogWithBasicActions from '../global/DialogWithBasicActions';
import TooltipWithButtonWithIcon from '../global/TooltipWithButtonWithIcon';

import {closeEditModal, modifyViewPortItem, deleteViewPortItem} from 'actions';
import styles from './style';
import typeCheck from 'utils/typeCheck';
import {editRectangleFormLists} from './textFieldLists';
import postMessage from 'utils/postMessage';

class EditContentRectangle extends Component {
    constructor(props) {
        super(props);
    }

    state = ({
        refs: {},
        openDeleteDialog: false,
        subImgStretch: this.props.item.subImgStretch,
        isRichTextPage: this.props.item.isRichTextPage,
        richPageId: this.props.item.richPageId
    });

    componentDidMount() {}

    handleRichPageIdSelectChange(event) {
        this.setState({richPageId: event.target.value});
    }

    handleChooseImg() {
        postMessage()
            .then(val => {
                console.log('val', val);
                if (val.suc) {
                    this.subImg.value = val.cb.bigUrl;
                    this.subImg.focus();
                    this.subImg.setSelectionRange(0, this.subImg.value.length);
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
                case 'background':
                    modifiedStyle[i] = val;
                    break;
                case 'zIndex':
                    modifiedStyle[i] = Number(val);
                    break;
                case 'url':
                    addonProps[i] = val;
                    break;
                default:
                    break;
            }
        }

        addonProps.subImg = this.subImg.value;
        addonProps.subImgStretch = this.state.subImgStretch;
        addonProps.isRichTextPage = this.state.isRichTextPage;
        addonProps.richPageId = this.state.richPageId;

        //console.log(addonProps);

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
        let {classes, item, companyList} = this.props,
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
            values = editRectangleFormLists.map(val => {
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
                    case 'isRichTextPage':
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

        return <form name="EditContentForm"
                     className={classes.root}
                     onSubmit={(e) => {alert(999) && e.preventDefault() && this.handleSave();}}>
            <TooltipWithButtonWithIcon title={'放弃修改或关闭'}
                                       titlePlace={'left'}
                                       btnClass={classes.buttonClose}
                                       btnTag={'iconButton'}
                                       btnClick={() => this.handleClose()}
                                       icon={<IconClose />} />
            <h2 className={classes.title}>编辑 - <small className='color-grey'>常规块</small></h2>
            {
                values.map((val, index) => {
                    switch (val.id) {
                        case 'isRichTextPage':
                        case 'subImgStretch':
                            return <FormControlLabel key={index}
                                                     label={val.label}
                                                     className={classes.switchRow}
                                                     control={
                                                         <Switch
                                                             checked={this.state[val.id]}
                                                             onChange={(event, checked) => this.setState({[val.id]: checked})}
                                                         />
                                                     } />;
                        case 'subImg':
                            return <div key={index} className={classes.textFieldWithImgChoose}>
                                <TextField
                                    className={classes.textFieldImg}
                                    label={val.label}
                                    title={val.title}
                                    id={val.id}
                                    type={'text'}
                                    margin={'dense'}
                                    fullWidth={true}
                                    inputRef={dom => this.subImg = dom}
                                    defaultValue={val.value}
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
                                              autoFocus={val.id === 'width'}
                                              className={classes.textField}
                                              label={val.label}
                                              title={val.title}
                                              fullWidth={
                                                  val.id === 'subImgStretch' ||
                                                  val.id === 'url'
                                              }
                                              margin="normal"
                                              inputRef={(dom) => this.state.refs[val.id] = dom}
                                              defaultValue={val.value}
                                              autoComplete={'off'}
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
            <DialogWithBasicActions open={this.state.openDeleteDialog}
                                    title={'请确认'}
                                    content={'确定要删除这个项目吗？'}
                                    cancelAction={() => this.setState({openDeleteDialog: false})}
                                    cancelText={'返回'}
                                    ensureAction={() => this.handleDelete()}
                                    ensureText={'删除'} />
        </form>;
    }
}

const mapStateToProps = ({companyList}) => ({companyList});
let EditContentRectangleComp = connect(mapStateToProps)(EditContentRectangle);
export default withStyles(styles)(EditContentRectangleComp);