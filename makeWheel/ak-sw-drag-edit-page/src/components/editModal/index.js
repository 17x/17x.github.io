import React from 'react';
import Modal from 'material-ui/Modal';
import {connect} from 'react-redux';

import './style';
import EditContentRectangle from './EditContentRectangle';
import EditContentSlider from './EditContentSlider';
import AddFootForm from './AddFootForm';
import EditFootForm from './EditFootForm';
import EditContentTextField from './EditContentTextField';
import EditContentProductList from './EditContentProductList';
import EditTemplate from './EditTemplate';

import {closeEditModal} from 'actions';

let EditModal = ({dispatch, editModal, viewportList, footList, templateList,getTemplateList}) => {
    let ModelComp = () => {
        let {manipulation, from, id, subId} = editModal,
            returnVal = null,
            isFoot = from === 'foot',
            isFootSub = from === 'foot-sub',
            isTemplate = from === 'template';

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
            } else if (isTemplate) {
                const item = templateList.filter(val => val.id === id)[0];
                returnVal = <EditTemplate manipulation={manipulation} item={item} />;
            }
        } else if (manipulation === 'add') {
            if (isFoot || isFootSub) {
                returnVal = <AddFootForm isSub={isFootSub} id={id} />;
            } else if (isTemplate) {
                returnVal = <EditTemplate manipulation={manipulation}
                                          item={{viewportList, footList}}
                                          getTemplateList={getTemplateList} />;
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

const mapStateToProps = ({editModal, viewportList, footList, templateList}) => ({
    editModal,
    viewportList,
    footList,
    templateList
});
EditModal = connect(mapStateToProps)(EditModal);

export default EditModal;