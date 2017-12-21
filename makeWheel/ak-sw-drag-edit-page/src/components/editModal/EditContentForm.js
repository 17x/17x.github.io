import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
    FormControl,
    FormGroup,
    FormControlLabel,
    TextField,
    withStyles,
    IconButton,
    Button
} from 'material-ui';
import IconClose from 'material-ui-icons/Close';
import IconDone from 'material-ui-icons/done';

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
        id: 'left',
        label: '左边'
    },
    {
        id: 'background',
        label: '背景图地址'
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

    componentDidMount() {
        //console.log(this.props);
    }

    handleClose() {
        this.props.dispatch(closeEditModal());
    }

    handleApply = (e, a) => {
        // width
        // height
        // top
        // right
        // bottom
        // left
        // background
        // url

        let style = {
            ...Object.assign({}, this.props.item.style),
            [a]: Number(e.target.value)
        };
        console.log('styles', style);
        this.props.dispatch(modifyViewPortItem({id: this.props.item.id, style}));
    };

    render() {
        const {classes, item} = this.props;

        console.log(item);
        return <form className={classes.root}>
            <IconButton fab='true'
                        onClick={() => this.handleClose()}
                        className={classes.buttonClose}>
                <IconClose />
            </IconButton>
            <h2 className={classes.title}>编辑</h2>
            {textFiledList.map((val, index) =>
                <TextField
                    key={index}
                    id={val.id}
                    label={val.label}
                    margin="normal"
                    onBlur={(e) => this.handleBlur(e, val.id)}
                    defaultValue={(() => {
                        return item.style && item.style[val.id] && item.style[val.id].toString();
                    })()}
                    autoComplete={'off'}
                    className={classes.textField}
                />)
            }
            <Button raised
                    dense
                    color='primary'
                    onClick={() => this.handleApply()}
                    className={classes.buttonApply}>
                <IconDone />
                应用
            </Button>
        </form>;
    }
}

let EditFormComp = connect()(EditForm);
export default withStyles(styles)(EditFormComp);