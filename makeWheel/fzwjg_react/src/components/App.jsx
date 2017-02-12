import React, {render,Component} from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      headerState:{
      	isShowBack:true,
      	city:'广州',
      	titleIcon:'icon-wjg-tb',
      	titleText:'服装微加工'
      }
    };
    this.handleHeader = this.handleHeader.bind(this);
  }

  handleHeader(headerState){
  	this.setState({
  		headerState
  	});
  }
  render(){
  	return (
  		<div>
			<Header 
			header={this.state.headerState}
			handleHeader={this.handleHeader}
			/>
			<div className="content">{this.props.children}</div>
			<Footer />
		</div>
	);
  }
}

export default App;