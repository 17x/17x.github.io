import React, {Component} from 'react';
import IScroll from '../global/IScroll';
import UniqueIdService from '../global/UniqueIdService';

let arr = [];
const tArr = [1, 2, 3, 4, 5, 6, 7];

tArr.forEach((val, index) => {
    const id = UniqueIdService.get('increase');
    console.log(UniqueIdService.get());
    arr.push(<li key={id} id={id}>{index}</li>);
});

const uId = UniqueIdService.get('increase');

class HomeTab1 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="scroll-content top bottom">
                <IScroll id={uId}>{arr}</IScroll>
            </div>
        );
    }
}

export default HomeTab1;
