import React, {Component} from 'react';
import Footer from '../global/Footer';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="home">
                <h1>Home</h1>
                <Footer/>
            </div>
        );
    }
}

export default Home;
