import React, {Component} from 'react';
import ScrollView  from '../../global/ScrollView';

class Cart extends Component {
    render() {
        return <div className="cart scroll-content scroll-content-bottom">
            <ScrollView>
                <h1>cart page</h1>
            </ScrollView>
        </div>;
    }
}
export default Cart;