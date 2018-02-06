import React, {Component} from 'react';
import {connect} from 'react-redux';

import {withStyles} from 'material-ui';
import {FormControlLabel} from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import TextField from 'material-ui/TextField';
import IconClose from 'material-ui-icons/Close';
import IconSave from 'material-ui-icons/Save';
import InsertPhoto from 'material-ui-icons/InsertPhoto';
import {MenuItem} from 'material-ui/Menu';
import {FormControl} from 'material-ui/Form';
import Select from 'material-ui/Select';
import Input, {InputLabel} from 'material-ui/Input';
import Button from 'material-ui/Button';
import TooltipWithButtonWithIcon from '../global/TooltipWithButtonWithIcon';

import {addItemToFooter, closeEditModal} from 'actions';
import postMessage from 'utils/postMessage';

import styles from './style';
import {footFormLists} from './textFieldLists';

class AddFootForm extends Component {
    constructor(props) {
        super(props);
    }

    state = ({
        isRichTextPage: false,
        richPageId: ''
    });

    componentDidMount() {}

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

    handleChooseImg() {
        postMessage()
            .then(val => {
                console.log('val', val);
                if (val.suc) {
                    this.icon.value = val.cb.smallUrl;
                    this.icon.focus();
                    this.icon.setSelectionRange(0, this.icon.value.length);
                }
            })
            .catch(err => {console.log('err', err);});
    }

    handleApply = () => {
        let arr = [
                'text',
                'sort',
                'url',
                'icon'
            ],
            itemObj = {};

        this.props.isSub && (arr.length = 3);

        arr.map(val => {
            itemObj[val] = val === 'sort' ? Number(this[val].value.trim()) : this[val].value.trim();
            /*if (val === 'sort') {
                itemObj[val] = Number(this[val].value.trim());
            } else {
                itemObj[val] = this[val].value.trim();
            }*/
        });

        itemObj.isRichTextPage = this.state.isRichTextPage;
        itemObj.richPageId = this.state.richPageId;

        if (this.props.isSub) {
            itemObj.modelType = 'foot-sub';
            itemObj.footId = this.props.id;
            this.props.dispatch(addItemToFooter(true, itemObj));
        } else {
            itemObj.modelType = 'foot-item';
            this.props.dispatch(addItemToFooter(false, itemObj));
        }
        // console.log(itemObj);
    };

    render() {
        const {classes, companyList} = this.props;
        return <form className={classes.root}
                     onSubmit={(e) => {e.preventDefault() && this.handleSave();}}>
            <TooltipWithButtonWithIcon title={'放弃修改或关闭'}
                                       titlePlace={'left'}
                                       btnTag={'iconButton'}
                                       btnClass={classes.buttonClose}
                                       btnClick={() => this.handleClose()}
                                       icon={<IconClose />} />
            <h2 className={classes.title}>添加</h2>
            {footFormLists.map((val, index) => {
                    switch (val.id) {
                        case 'isRichTextPage':
                            return <FormControlLabel key={index}
                                                     label={val.label}
                                                     className={classes.switchRow}
                                                     control={
                                                         <Switch
                                                             checked={this.state.isRichTextPage}
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
                                              autoFocus={val.id === 'text'}
                                              className={classes.textField}
                                              label={val.label}
                                              title={val.title}
                                              id={val.id}
                                              type={'text'}
                                              margin={'dense'}
                                              fullWidth={true}
                                              inputRef={(dom) => this[val.id] = dom}
                                              autoComplete={'off'}
                            />;
                    }
                }
            )}
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
                <TooltipWithButtonWithIcon title={'保存并关闭浮层'}
                                           titlePlace={'top'}
                                           btnTag={'Button'}
                                           btnColor={'primary'}
                                           btnType={'submit'}
                                           btnClick={() => this.handleSave()}
                                           icon={<IconSave />} />
            </div>
        </form>;
    }
}

const mapStateToProps = ({companyList}) => ({companyList});
let AddFootFormComp = connect(mapStateToProps)(AddFootForm);
export default withStyles(styles)(AddFootFormComp);
