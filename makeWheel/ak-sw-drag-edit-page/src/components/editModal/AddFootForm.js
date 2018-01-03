import React, {Component} from 'react';
import {connect} from 'react-redux';

import {withStyles} from 'material-ui';
import TextField from 'material-ui/TextField';
import IconClose from 'material-ui-icons/Close';
import IconSave from 'material-ui-icons/Save';

import TooltipWithButtonWithIcon from '../global/TooltipWithButtonWithIcon';

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
        //console.log(footTextFieldLists);
        const {classes} = this.props;
        return <form className={classes.root}
                     onSubmit={(e) => {e.preventDefault() && this.handleSave();}}>
            <TooltipWithButtonWithIcon title={'放弃修改或关闭'}
                                       titlePlace={'left'}
                                       btnTag={'iconButton'}
                                       btnClass={classes.buttonClose}
                                       btnClick={() => this.handleClose()}
                                       icon={<IconClose />} />

            <h2 className={classes.title}>添加</h2>
            {footTextFieldLists.map((val, index) =>
                <TextField key={index}
                           autoFocus={val.id === 'text'}
                           className={classes.textField}
                           label={val.label}
                           title={val.title}
                           id={val.id}
                           type={'text'}
                           margin={'dense'}
                           fullWidth={true}
                           inputRef={(dom) => this.state.refs[val.id] = dom}
                           autoComplete={'off'}
                />)
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

// const mapStateToProps = ({footList}) => ({footList});
let AddFootFormComp = connect()(AddFootForm);
export default withStyles(styles)(AddFootFormComp);
