import React from 'react';
import {Link} from 'react-router'
import City from '../components/City.jsx'

class Header extends React.Component{

  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleToggleCity = this.handleToggleCity.bind(this)
    this.state={
    	isShowCity:false
    }
  }

  handleChange(val){
  	this.props.handleHeader({
  		isShowBack:!this.props.header.isShowBack
  	})
  }
  handleToggleCity(){
  	this.setState((prevState)=>({
  		isShowCity:!prevState.isShowCity
  	}))
  }
  render(){
  	const goBack = ()=>{
		history.go(-1);
		return false;
	}
	const backStyle = {
		display:(this.props.header.isShowBack)=== false ?'none':'block'
	}
	const headerTitleIcon = 'icon iconfont '+ this.props.header.titleIcon
  	const headerTitleText = this.props.header.titleText
  	return (
  		<header>
			{
				this.state.isShowCity && <City isShowCity={this.state.isShowCity}/>
			}
			<div className="headerBack">
				<a onClick={goBack} style={backStyle}>
			        <i className="iconfont icon-jiantou-copy"></i>
			    </a>
		    </div>
			<div className="headerCenter">
				<i className={headerTitleIcon}></i>
				<span>{headerTitleText}</span>
			</div>
			<div className="headerCity" onClick={this.handleToggleCity}>
				<span>{this.props.header.city}</span>
				<i className="iconfont icon-wjg-dt"></i>
			</div>
		</header>
	)
  }
}

export default Header