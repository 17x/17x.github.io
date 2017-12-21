import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    withStyles,
    TextField,
    IconButton
} from 'material-ui';
import IconClose from 'material-ui-icons/Close';

import {closeEditModal} from '../../actions';
import typeCheck from '../../assets/util/typeCheck';
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
        id: 'url',
        label: '指向地址'
    }
];

class EditFootForm extends Component {
    constructor(props) {
        super(props);
    }

    handleClose() {
        this.props.dispatch(closeEditModal());
    }

    componentDidMount() {
        if (typeCheck(this.props.id) !== 'Number') {
            console.log('no id ');
        }
    }

    render() {
        console.log(this.props);
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

const mapStateToProps = ({footList}) => ({footList});
let EditFootFormComp = connect(mapStateToProps)(EditFootForm);
export default withStyles(styles)(EditFootFormComp);
