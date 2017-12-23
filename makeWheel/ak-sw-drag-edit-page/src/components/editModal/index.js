import React, {Component} from 'react';
import Modal from 'material-ui/Modal';
import {connect} from 'react-redux';

import './style';
import EditContentForm from './EditContentForm';
import AddFootForm from './AddFootForm';
import EditFootForm from './EditFootForm';

import {closeEditModal} from 'actions';

let EditModal = ({dispatch, editModal, viewportList, footList}) => {

    let {manipulation, from, id, subId} = editModal,
        item = null;

    if (manipulation === 'edit') {
        (from === 'content' ? viewportList : footList).map(val => {
            if (val.id === id) {
                item = val;
            }
        });

        if (from === 'foot-sub') {
            item = item.sub.filter(val => val.id === subId)[0];
        }
    }

    //console.log(editModal);
    let ModelComp = () => {
        if (manipulation === 'add') {
            if (from === 'foot' || from === 'foot-sub') {
                return <AddFootForm />;
            } else {
                return null;
            }
        } else if (manipulation === 'edit') {
            if (from === 'content') {
                return <EditContentForm item={item} />;
            } else if (from === 'foot' || from === 'foot-sub') {
                return <EditFootForm footId={id} isSub={!!subId} item={item} />;
            } else {
                return null;
            }
        } else {
            return null;
        }
    };

    return <Modal show={editModal.open}
                  autoFocus={'false'}
                  onEscapeKeyUp={() => dispatch(closeEditModal())}
                  BackdropTransitionDuration={500}
                  BackdropInvisible={false}>
        <ModelComp />
    </Modal>;
};

const mapStateToProps = ({editModal, viewportList, footList}) => ({editModal, viewportList, footList});
EditModal = connect(mapStateToProps)(EditModal);

export default EditModal;