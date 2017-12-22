import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    withStyles,
    TextField,
    Tooltip,
    Button,
    IconButton
} from 'material-ui';

import IconClose from 'material-ui-icons/Close';
import IconDone from 'material-ui-icons/done';
import IconSave from 'material-ui-icons/save';

import {closeEditModal, addItemToFooter} from '../../actions';
import typeCheck from '../../assets/util/typeCheck';
import styles from './style';

const textFiledList = [
    {
        id: 'name',
        label: '名称'
    },
    {
        id: 'sort',
        label: '排序'
    },
    {
        id: 'url',
        label: '指向地址'
    }
];

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
            attr[i] = this.state.refs[i].value.trim();
        }

        this.props.dispatch(addItemToFooter({
            modelType: 'foot-item',
            text: this.state.refs['name'].value.trim(),
            sort: this.state.refs['sort'].value.trim(),
            redirect: this.state.refs['url'].value.trim()
        }));
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
            {textFiledList.map((val, index) =>
                <TextField key={index}
                           className={classes.textField}
                           label={val.label}
                           title={val.title}
                           id={val.id}
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
                {/*<Tooltip title='应用更改' placement='left'
                         className={classes.buttonApply}>
                    <Button raised
                            dense
                            color='primary'
                            onClick={() => this.handleApply()}>
                        <IconDone />
                        应用
                    </Button>
                </Tooltip>*/}
            </div>
        </form>;
    }
}

// const mapStateToProps = ({footList}) => ({footList});
let AddFootFormComp = connect()(AddFootForm);
export default withStyles(styles)(AddFootFormComp);
