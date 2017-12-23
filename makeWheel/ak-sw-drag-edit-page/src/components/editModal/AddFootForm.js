import React, {Component} from 'react';
import {connect} from 'react-redux';

import {withStyles} from 'material-ui';
import TextField from 'material-ui/TextField';
import Tooltip from 'material-ui/Tooltip';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import IconClose from 'material-ui-icons/Close';
import IconSave from 'material-ui-icons/Save';

import {closeEditModal, addItemToFooter, modifyViewFooter} from 'actions';

import styles from './style';
import {footTextFieldLists} from './textFieldLists';

class AddFootForm extends Component {
    constructor(props) {
        super(props);
    }

    state = ({
        refs: {}
    });

    componentDidMount() {

    }

    handleClose() {
        this.props.dispatch(closeEditModal());
    }

    handleSave() {
        this.handleApply();
        this.handleClose();
    }

    handleApply = () => {
        let attr = {};

        for (let i in this.state.refs) {
            if (i === 'sort') {
                attr[i] = Number(this.state.refs[i].value.trim());
                //console.log('sort', attr[i]);
            } else {
                attr[i] = this.state.refs[i].value.trim();
            }
        }
        if (this.props.isSub) {
            this.props.dispatch(addItemToFooter(true, {
                modelType: 'foot-item',
                text: this.state.refs['text'].value.trim(),
                sort: this.state.refs['sort'].value.trim(),
                url: this.state.refs['url'].value.trim()
            }));
        } else {
            this.props.dispatch(addItemToFooter(false, {
                modelType: 'foot-item',
                text: this.state.refs['text'].value.trim(),
                sort: this.state.refs['sort'].value.trim(),
                url: this.state.refs['url'].value.trim()
            }));
        }
    };

    render() {
        const {classes} = this.props;
        return <form className={classes.root}>
            <IconButton fab='true'
                        onClick={() => this.handleClose()}
                        className={classes.buttonClose}>
                <IconClose />
            </IconButton>
            <h2 className={classes.title}>添加</h2>
            {footTextFieldLists.map((val, index) =>
                <TextField key={index}
                           className={classes.textField}
                           label={val.label}
                           title={val.title}
                           margin="normal"
                           inputRef={(dom) => this.state.refs[val.id] = dom}
                           autoComplete={'off'}
                />)
            }
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
            </div>
        </form>;
    }
}

// const mapStateToProps = ({footList}) => ({footList});
let AddFootFormComp = connect()(AddFootForm);
export default withStyles(styles)(AddFootFormComp);
