import React, {PureComponent} from 'react';
import IScroll from '../global/IScroll';
import UniqueIdService from '../global/UniqueIdService';

const uId = UniqueIdService.get('increase');
let arr = [];
const tArr = [1, 2, 3, 4, 5, 6, 7, 8, 11, 15,16,20];

tArr.forEach((val, index) => {
    const id = UniqueIdService.get('increase');
    //console.log(UniqueIdService.get());
    arr.push(<li key={id} id={id}>{val}</li>);
});

class HomeTab1 extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // console.log(111);
        // console.log(this.props)
    }

    render() {
        return (
            <div className="scroll-content top bottom">
                <div>{arr}</div>
                {/*<IScroll>{arr}</IScroll>*/}
            </div>
        );
    }
}

export default HomeTab1;
