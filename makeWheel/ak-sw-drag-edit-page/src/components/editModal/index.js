import React, {Component} from 'react';
import Modal from 'material-ui/Modal';
import {connect} from 'react-redux';

import './style';
import EditContentForm from './EditContentForm';
import AddFootForm from './AddFootForm';
import EditFootForm from './EditFootForm';

import {closeEditModal} from 'actions';
// todo 添加文本选项 简化组件 （删除 关闭 添加等）
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
                        returnVal = <EditContentForm item={item} />;
                        break;
                    case 'carousel':
                        /* returnVal = <EditContentForm tabIndex={10} item={item} />;*/
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