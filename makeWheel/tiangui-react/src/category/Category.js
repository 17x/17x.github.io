import React, {Component} from 'react';
import Footer from '../global/Footer';

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="Category">
                <h1>Category page</h1>
                <Footer/>
            </div>
        );
    }
}

export default Category;