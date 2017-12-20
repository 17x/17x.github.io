import React, {Component} from 'react';
import {Modal} from 'material-ui';
import {connect} from 'react-redux';

import './style';
import AddFootItem from './AddFootForm';
import EditForm from './EditForm';

let EditModal = ({dispatch, editModal, viewportList}) => {

    let mode = 'add',
        item = null;

    viewportList.map(val => {
        if (val.id === editModal.id) {
            item = val;
            mode = 'edit';
        }
    });

    //解决Modal一些奇怪的问题
    let ModelComp = () => {
        if (mode === 'add') {
            return <Modal show={editModal.open}
                          autoFocus={'false'}
                          BackdropTransitionDuration={500}
                          BackdropInvisible={false}>
                <AddFootItem id={editModal.id} />
            </Modal>;
        } else if (mode === 'edit') {
            return <Modal show={editModal.open}
                          autoFocus={false}
                          BackdropTransitionDuration={500}
                          BackdropInvisible={false}>
                <EditForm item={item} />
            </Modal>;
        }
    };

    return <ModelComp />;

};

const mapStateToProps = ({editModal, viewportList}) => ({editModal, viewportList});
EditModal = connect(mapStateToProps)(EditModal);

export default EditModal;