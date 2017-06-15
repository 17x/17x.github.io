import React, {Component} from 'react';
import IScroll from '../global/IScroll';
import UniqueIdService from '../global/UniqueIdService';

const uId = UniqueIdService.get('increase');
let arr = [];
const tArr = [1, 2, 3, 4, 5, 6, 7,8];

tArr.forEach((val, index) => {
    const id = UniqueIdService.get('increase');
    //console.log(UniqueIdService.get());
    arr.push(<li key={id} id={id}>{index}</li>);
});

class HomeTab1 extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //console.log(this.props)
    }

    render() {
        console.log(this.props);
        return (
            <div className="scroll-content top bottom">
                <IScroll>{arr}</IScroll>
            </div>
        );
    }
}

export default HomeTab1;
