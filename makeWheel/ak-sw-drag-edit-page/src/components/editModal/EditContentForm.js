import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
    TextField,
    withStyles,
    IconButton,
    Button,
    Tooltip
} from 'material-ui';

import IconClose from 'material-ui-icons/Close';
import IconDone from 'material-ui-icons/done';
import IconSave from 'material-ui-icons/save';

import {closeEditModal, modifyViewPortItem} from '../../actions';
import styles from './style';
import typeCheck from '../../assets/util/typeCheck';

let textFiledList = [
    {
        id: 'width',
        label: '宽',
        title: '接收数字或百分比 数字在页面渲染时将会被乘以二'
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
                <TextField key={index}
                           className={classes.textField}
                           label={val.label}
                           title={val.title}
                           margin="normal"
                           inputRef={(dom) => this.state.refs[val.id] = dom}
                           defaultValue={defaultValues[val.id]}
                           autoComplete={'off'}
                />)}
            <div className={classes.buttonsWrap}>
                <Tooltip title='保存并关闭浮层' placement='right' className={classes.buttonSave}>
                    <Button raised
                            dense
                            color='primary'
                            onClick={() => this.handleSave()}>
                        <IconSave />
                        确定
                    </Button>
                </Tooltip>
                <Tooltip title='应用更改' placement='left'
                         className={classes.buttonApply}>
                    <Button raised
                            dense
                            color='primary'
                            onClick={() => this.handleApply()}>
                        <IconDone />
                        应用
                    </Button>
                </Tooltip>
            </div>
        </form>;
    }
}

let EditFormComp = connect()(EditForm);
export default withStyles(styles)(EditFormComp);