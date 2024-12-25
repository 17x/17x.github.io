import React, {Component} from 'react';
import './category.scss'

class Category extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return ( <div className="category">
            <h1>Category page</h1>
        </div> );
    }
}

export default Category;