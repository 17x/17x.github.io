import React, {Component} from 'react';
import Footer from '../global/Footer';

class shoppingCart extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="shoppingCart">
                <h1>shoppingCart</h1>
                <Footer/>
            </div>
        );
    }
}

export default shoppingCart;
