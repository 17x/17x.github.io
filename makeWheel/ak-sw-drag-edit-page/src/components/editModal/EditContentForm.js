import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
    FormControl,
    FormGroup,
    FormControlLabel,
    TextField,
    withStyles,
    IconButton
} from 'material-ui';
import IconClose from 'material-ui-icons/Close';

import {closeEditModal, modifyViewPortItem} from '../../actions';
import styles from './style';

const textFiledList = [
    {
        id: 'width',
        label: '宽'
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
        id: 'right',
        label: '底部'
    },
    {
        id: 'right',
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

    state = ({
        style: null
    });

    componentDidMount() {
        console.log(this.props);
    }

    handleClose() {
        this.props.dispatch(closeEditModal());
    }

    handleChange = name => event => {
        //this.setState({[name]: event.target.checked});
        this.props.dispatch(modifyViewPortItem());
    };

    render() {
        const {classes} = this.props;

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
                    className={classes.textField}
                />)
            }
        </form>;
    }
}

let EditFormComp = connect()(EditForm);
export default withStyles(styles)(EditFormComp);