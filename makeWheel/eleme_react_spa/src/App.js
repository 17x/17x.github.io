import React, {Component} from 'react';
import NavHead from 'components/Global/NavHead';
import {connect} from 'react-redux';
import {Route} from 'react-router';
import {Link} from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import routers from './routers';
const mapStateToProps = ({ShowNavHead}) => ({ShowNavHead});
@connect(mapStateToProps)
class App extends Component {

    state = {};

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        const {ShowNavHead} = this.props.ShowNavHead;
        return <div id='container'>

            {
                ShowNavHead ? <NavHead/> : undefined
            }

            {/*   {
                routers.map((val, index) =>
                    <Route key={index} path={val.path} component={val.component}/>
                )
            }*/}

            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Link to='/about'>about</Link>

        </div>;
    }
}

export default App;
