import React, {Component} from 'react';
import Footer from '../global/Footer';

class usercenter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="usercenter">
                <h1>usercenter</h1>
                <Footer/>
            </div>
        );
    }
}

export default usercenter;
