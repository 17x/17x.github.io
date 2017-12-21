import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
    FormControl,
    FormHelperText,
    FormGroup,
    FormControlLabel,
    TextField,
    withStyles,
    IconButton,
    Button,
    Tooltip
} from 'material-ui';
import Input, {InputLabel} from 'material-ui/Input';

import IconClose from 'material-ui-icons/Close';
import IconDone from 'material-ui-icons/done';
import IconSave from 'material-ui-icons/save';

import {closeEditModal, modifyViewPortItem} from '../../actions';
import styles from './style';
import typeCheck from '../../assets/util/typeCheck';

let textFiledList = [
    {
        id: 'width',
        label: '宽( number or number% )'
    },
    {
        id: 'height',
        label: '高'
    },
    {
        id: 'left',
        label: '左边'
    },
    {
        id: 'top',
        label: '顶部'
    },
    {
        id: 'right',
        label: '右边'
    },
    {
        id: 'bottom',
        label: '底部'
    },
    {
        id: 'background',
        label: '背景 - color url(address)'
    },
    {
        id: 'url',
        label: '指向地址'
    }
];

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
        refs: {}
    });

    componentDidMount() {
        //console.log(this.props);
    }

    handleClose() {
        this.props.dispatch(closeEditModal());
    }

    handleSave() {
        this.handleApply();
        this.handleClose();
    }

    handleApply = () => {

        // width
        // height
        // top
        // right
        // bottom
        // left
        // background
        // url

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
            {textFiledList.map((val, index) =>
                <FormControl key={index}>
                    <Input
                        id={val.id}
                        label={val.label}
                        margin="normal"
                        inputRef={(dom) => this.state.refs[val.id] = dom}
                        // onBlur={(e) => this.handleBlur(e, val.id)}
                        defaultValue={defaultValues[val.id]}
                        autoComplete={'off'}
                        className={classes.textField}
                    />
                    <FormHelperText>{val.helper}</FormHelperText>
                </FormControl>)}
            <Tooltip title='保存并关闭浮层' placement='right'>
                <Button raised
                        dense
                        color='primary'
                        onClick={() => this.handleSave()}
                        className={classes.buttonApply}>
                    <IconSave />
                    确定
                </Button>
            </Tooltip>
            <Tooltip title='应用更改' placement='left'>
                <Button raised
                        dense
                        color='primary'
                        onClick={() => this.handleApply()}
                        className={classes.buttonApply + ' ' + classes.buttonSave}>
                    <IconDone />
                    应用
                </Button>
            </Tooltip>
        </form>;
    }
}

let EditFormComp = connect()(EditForm);
export default withStyles(styles)(EditFormComp);