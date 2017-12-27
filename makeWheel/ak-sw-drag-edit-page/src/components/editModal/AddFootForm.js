import React, {Component} from 'react';
import {connect} from 'react-redux';

import {withStyles} from 'material-ui';
import TextField from 'material-ui/TextField';
import Tooltip from 'material-ui/Tooltip';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import IconClose from 'material-ui-icons/Close';
import IconSave from 'material-ui-icons/Save';

import {addItemToFooter, closeEditModal} from 'actions';

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
            } else {
                attr[i] = this.state.refs[i].value.trim();
            }
        }

        //console.log(this.props);

        if (this.props.isSub) {
            this.props.dispatch(addItemToFooter(true, {
                modelType: 'foot-sub',
                text: this.state.refs['text'].value.trim(),
                sort: Number(this.state.refs['sort'].value.trim()),
                url: this.state.refs['url'].value.trim(),
                footId: this.props.id
            }));
        } else {
            this.props.dispatch(addItemToFooter(false, {
                modelType: 'foot-item',
                text: this.state.refs['text'].value.trim(),
                sort: Number(this.state.refs['sort'].value.trim()),
                url: this.state.refs['url'].value.trim()
            }));
        }
    };

    render() {
        const {classes} = this.props;
        return <form className={classes.root}>
            <Tooltip title='放弃修改或关闭' placement='left' disableTriggerFocus={true}>
                <IconButton fab='true'
                            onClick={() => this.handleClose()}
                            className={classes.buttonClose}>
                    <IconClose />
                </IconButton>
            </Tooltip>
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
                <Tooltip title='保存并关闭浮层'
                         placement='top'
                         disableTriggerFocus={true}
                         children={
                             <Button raised
                                     dense
                                     fab
                                     mini
                                     color='primary'
                                     onClick={() => this.handleSave()}
                                     children={<IconSave />} />
                         } />
            </div>
        </form>;
    }
}

// const mapStateToProps = ({footList}) => ({footList});
let AddFootFormComp = connect()(AddFootForm);
export default withStyles(styles)(AddFootFormComp);
