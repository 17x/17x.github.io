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
import {MenuItem} from 'material-ui/Menu';
import {FormControl} from 'material-ui/Form';
import Select from 'material-ui/Select';
import Input, {InputLabel} from 'material-ui/Input';
import DialogWithBasicActions from '../global/DialogWithBasicActions';
import TooltipWithButtonWithIcon from '../global/TooltipWithButtonWithIcon';

import {closeEditModal, modifyViewPortItem, deleteViewPortItem} from 'actions';
import styles from './style';
import typeCheck from 'utils/typeCheck';
import {editProductListFormLists} from './textFieldLists';

class EditContentProductList extends Component {
    constructor(props) {
        super(props);
        //console.log(props);
    }

    state = ({
        refs: {},
        openDeleteDialog: false,
        bigLabelId: this.props.item.bigLabelId,
        smallId: this.props.item.smallId,
        brandId: this.props.item.brandId
    });

    componentDidMount() {}

    handleSelectChange = event => {
        console.log(event.target.name, event.target.value);
        this.setState({[event.target.name]: event.target.value});
    };

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
                case 'miniTransactionPrice':
                case 'maxTransactionPrice':
                case 'productCount':
                case 'title':
                    addonProps[i] = val;
                    break;
                default:
                    break;
            }
        }

        addonProps = {
            ...addonProps,
            bigLabelId: this.state.bigLabelId,
            smallId: this.state.smallId,
            brandId: this.state.brandId
        };
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
        let {classes, item} = this.props,
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
            values = editProductListFormLists.map(val => {
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
                    case 'title':
                    case 'miniTransactionPrice':
                    case 'maxTransactionPrice':
                    case 'productCount':
                        returnVal = item[i];
                        break;
                    default:
                        break;
                }

                return {
                    ...val,
                    value: returnVal
                };
            }),
            brandList = this.props.brandList.map(val => ({...val, labelText: val.name})),
            bigLabelList = this.props.categoryList,
            smallList = (() => {
                let aResult;
                if (this.state.bigLabelId >= 0) {
                    aResult = bigLabelList.filter(val => val.bigLabelId === this.state.bigLabelId)[0];
                    //console.log(bigLabelList, this.state.bigLabelId);
                    //console.log(aResult);
                    aResult = aResult ? aResult.smallLabelForms : null;
                    return aResult;
                } else {
                    return null;
                }
            })(),
            ProductListCommon = ({item}) => {
                //console.log('ProductListCommon', item);
                if (!item) return null;
                let itemList = eval(item.id.replace('Id', 'List')),
                    curVal = this.state[item.id];

                curVal = !isNaN(curVal) ? curVal : '';
                //console.log('curVal', curVal);

                return <FormControl className={classes.inlineSelect}>
                    <InputLabel>{item.label}</InputLabel>
                    <Select value={curVal}
                            onChange={this.handleSelectChange}
                            disabled={!itemList}
                            input={<Input name={item.id} />}>
                        {
                            itemList && itemList.map((val, index) =>
                                <MenuItem key={index}
                                          value={
                                              item.id === 'bigLabelId' ? val.bigLabelId : val.id
                                          }>{val.labelText}</MenuItem>
                            )
                        }
                    </Select>
                </FormControl>;
            };

        return <form name="EditContentForm"
                     className={classes.root}
                     onSubmit={(e) => {e.preventDefault() && this.handleSave();}}>
            <TooltipWithButtonWithIcon title={'放弃修改或关闭'}
                                       titlePlace={'left'}
                                       btnClass={classes.buttonClose}
                                       btnTag={'iconButton'}
                                       btnClick={() => this.handleClose()}
                                       icon={<IconClose />} />
            <h2 className={classes.title}>编辑 - <small className='color-grey'>产品列表</small></h2>
            {
                values.map((val, index) => {
                    switch (val.id) {
                        case 'brandId':
                        case 'bigLabelId':
                        case 'smallId':
                            return <ProductListCommon item={val} key={index} />;
                        default:
                            return <TextField key={index}
                                              autoFocus={val.id === 'width'}
                                              className={classes.textField}
                                              label={val.label}
                                              title={val.title}
                                              fullWidth={false}
                                              margin="normal"
                                              inputRef={(dom) => this.state.refs[val.id] = dom}
                                              defaultValue={val.value}
                                              autoComplete={'off'}
                            />;
                    }
                })
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

const mapStateToProps = ({categoryList, brandList}) => ({categoryList, brandList});
let EditContentProductListComp = connect(mapStateToProps)(EditContentProductList);
export default withStyles(styles)(EditContentProductListComp);