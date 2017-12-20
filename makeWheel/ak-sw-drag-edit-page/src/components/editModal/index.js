import React, {Component} from 'react';
import {Modal} from 'material-ui';
import {connect} from 'react-redux';

import './style.scss';
import AddForm from './AddFootItem';
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

    return <Modal show={editModal.open} BackdropInvisible={false}>
        {
            mode === 'add'
                ? <AddForm id={editModal.id} />
                : <EditForm item={item} />
        }
    </Modal>;
};

const mapStateToProps = ({editModal, viewportList}) => ({editModal, viewportList});
EditModal = connect(mapStateToProps)(EditModal);

export default EditModal;