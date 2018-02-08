import React, {Component} from 'react';
import Modal from 'material-ui/Modal';
import {connect} from 'react-redux';

import './style';
import EditContentRectangle from './EditContentRectangle';

import {closeEditModal} from 'actions';

let EditModal = ({dispatch, editModal, viewportList, footList}) => {
    let ModelComp = () => {
        let {manipulation, from, id, subId} = editModal,
            returnVal = null,
            isFoot = from === 'foot',
            isFootSub = from === 'foot-sub';

        if (manipulation === 'edit') {
            if (from === 'content') {
                const item = viewportList.filter(val => val.id === id)[0];
                //console.log(item);
                switch (item.modelType) {
                    case 'square':
                    case 'rectangle':
                        returnVal = <EditContentRectangle item={item} />;
                        break;
                    case 'carousel':
                        returnVal = <EditContentSlider item={item} />;
                        break;
                    case 'textField':
                        returnVal = <EditContentTextField item={item} />;
                        break;
                    case 'productList':
                        returnVal = <EditContentProductList item={item} />;
                        break;
                    default:
                        throw new Error('unknown model type. please checking you pass on ');
                }
            } else if (isFoot || isFootSub) {
                returnVal = <EditFootForm footId={id}
                                          isSub={isFootSub}
                                          item={
                                              isFoot && footList.filter(val => val.id === id)[0]
                                              ||
                                              isFootSub && footList.filter(val => val.id === id)[0].sub.filter(val => val.id === subId)[0]
                                          } />;
            }
        } else if (manipulation === 'add') {
            if (isFoot || isFootSub) {
                returnVal = <AddFootForm isSub={isFootSub} id={id} />;
            }
        }

        return returnVal;
    };

    return <Modal show={editModal.open}
                  onEscapeKeyUp={() => dispatch(closeEditModal())}
                  BackdropTransitionDuration={500}
                  BackdropInvisible={false}
                  keepMounted={true}
                  tabIndex={10}
                  children={<ModelComp />} />;
};

const mapStateToProps = ({editModal, viewportList, footList}) => ({editModal, viewportList, footList});
EditModal = connect(mapStateToProps)(EditModal);

export default EditModal;