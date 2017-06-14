import React from 'react';
import IScroll from '../global/IScroll';
import UniqueIdService from '../global/UniqueIdService';

const HomeTab1 = () => {

/*
    let arr = [];
     alert(1);
     const tArr = [1, 2, 3, 4,5,6,7];
     tArr.forEach((val, index) => {
         const id = UniqueIdService.get('increase');
         console.log(UniqueIdService.get());
         arr.push(<li key={id} id={id}>{index}</li>);
     });
 */
    const uId = UniqueIdService.get('increase');
    return (
        <div className="scroll-content top bottom">
            <IScroll id={uId}>
                {/*{arr}*/}
            </IScroll>
        </div>
    );
};

export default HomeTab1;
