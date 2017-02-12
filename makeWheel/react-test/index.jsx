'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './hello.jsx';



/*class Welcome extends React.Component{
	render(){
		return <h1> hello , {this.props.name}</h1>
	}
}*/

// const element = <Welcome name="Sara" />;

/*var Welcome = (props)=><h1> Hello,{props.name}</h1>;

var App = ()=>(
	<div> 
	   <Welcome name="Sara" />
	   <Welcome name="Cahal" />
	   <Welcome name="Edite" />
	</div>
);*/

/*
function tick(){

	const element = (
		<div>
			<h1> hello world!</h1>
			<h2>It is {new Date().toLocaleTimeString()}.</h2>
		</div>
	);

	ReactDOM.render(
		element,
  		document.getElementById('root')
	);
}
setInterval(tick,1000)*/

// template literals
//  classes
// Arrow function
/*
var formatDate = (date)=>date.toLocaleTimeString();

var Avatar = (props)=>(
	<img className="Avatar" 
	src={props.user.avatarUrl}
	alt="props.user.name"/>
);

var UserInfo = (props)=>(
	<div className="UserInfo">
		<Avatar user={props.user}/>
		<div className="UserInfo-name">
	        {props.user.name}
      	</div>
	</div>
);

var Comment = (props)=>(
	<div className="Comment">
		<UserInfo user={props.author}/>
		<div className="Comment-text">
			{props.text}
		</div>
		<div className="Comment-date">
			{formatDate(props.date)}
		</div>
	</div>
);

const comment = {
  date: new Date(),
  text: 'I hope you enjoy learning React!',
  author: {
    name: 'Hello Kitty',
    avatarUrl: 'http://placekitten.com/g/64/64'
  }
};
*/
/*
class Clock extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			date:new Date()
		}
	}
	componentDidMount(){
		this.timerId = setInterval(()=>this.tick(),1000)
	}
	coomponentWillUnmount(){
		clearinterval(this.timerId)
	}
	tick(){
		this.setState({
			date:new Date()
		})
	}
	render (){
		return (
			<div>
				<h1>Hello, world!</h1>
				<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
			</div>
		)
	}
}
*/
/*
class Toggle extends React.Component{
	constructor(props){
		super(props);
		this.state={
			isToggleOn:true
		}
		this.handleClick = this.handleClick.bind(this)
	}
	handleClick(){
		this.setState( (prevState)=>({
			isToggleOn:!prevState.isToggleOn
		}))
	}
	render(){
		return <button onClick={this.handleClick}>{this.state.isToggleOn?'ON':'OFF'}</button>
	}
}*/

/*
function Greeting(props){
	return props.isLoggedIn? <h1> Welcome back</h1> : <h1> Welcome stranger</h1>;
}

class LogginCtrl extends React.Component{
	constructor(props){
		super(props);
		this.state={
			isLoggedIn:false
		};
		this.handleLoggin = this.handleLoggin.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}
	handleLoggin (){
		this.setState((prevState)=>({
			isLoggedIn:!prevState.isLoggedIn
		}));
	}
	handleLogout (){
		this.setState((prevState)=>({
			isLoggedIn:!prevState.isLoggedIn
		}));
	}
	render(){
		return (<form action="">
			<Greeting isLoggedIn={this.state.isLoggedIn}/>
			{this.state.isLoggedIn
				? <button type="button" onClick={this.handleLoggin}>logout</button>
				: <button type="button" onClick={this.handleLogout}>loggin</button> 
			}
		</form>);
	}
}*/
/*
function WarningBanner(props){
	const style={
		backgroundColor:'red',
		fontSize:'25px'
	};
	return props.warn === false?null : <h1 style={style}>warning!!</h1>;
}
class Page extends React.Component{
	constructor(props){
		super(props);
		this.state={
			showWarning:true
		};
		this.handleToggleClick = this.handleToggleClick.bind(this);
	}
	handleToggleClick (){
		this.setState(prevState=>({
			showWarning:!prevState.showWarning
		}));
	}
	
	render(){
		return (<form action="">
			<WarningBanner warn={this.state.showWarning}/>
			<button type="button" onClick={this.handleToggleClick}>
			{this.state.showWarning?'hide':'show'}
			</button>
		</form>);
	}
}
*/
/*

var Blog = (props)=>{
	const sidebar = props.posts.map((post)=>
		<li key={post.id}>
			{post.title}
		</li>
	);

	const content = props.posts.map((post)=>
		<li key = {post.id}>
			<h1>{post.title}</h1>
			<p>{post.content}</p>
		</li>
	);
	return <div>
		{sidebar}
		<br/>
		{content}
	</div>
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];
*/

/*class NameForm extends React.Component{
	constructor(props){
		super(props);
		this.state={
			value:''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(event){
		this.setState({
			value:event.target.value
		})
	}
	handleSubmit(event){
		alert(`this.state.value ${this.state.value}`)
		event.preventDefault();
	}
	render(){
		return <form onSubmit={this.handleSubmit}>
			<label htmlFor="">
				<input type="text" onChange={this.handleChange} /></label>
			<input type="submit" value="submit"/>
		</form>
	}
}
*/
/*
class FlavorForm extends React.Component{
	constructor(props){
		super(props);
		this.state={
			value:'coconut'
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(event){
		this.setState({
			value:event.target.value
		})
	}
	handleSubmit(event){
		alert(`this.state.value ${this.state.value}`)
		event.preventDefault();
	}

	render(){
		return <form onSubmit={this.handleSubmit}>
			<select value={this.state.value} onChange={this.handleChange}>
				<option value="grapefruit">Grapefruit</option>
	            <option value="lime">Lime</option>
	            <option value="coconut">Coconut</option>
	            <option value="mango">Mango</option>
			</select>
			<input type="submit" value="submit"/>
		</form>
	}
}
*/

/*
class Reservation extends React.Component{
	constructor(props){
		super(props);
		this.state={
			isGoing:true,
			numberOfGuests:2
		};
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(event){
		const target = event.target;
		const name = target.name
		const value = target.type === 'checkbox'?target.checked:target.value; 

		this.setState({
			[name]:value
		});
		console.log(this.state)
	}

	render(){
		return <form onSubmit={this.handleSubmit}>
			<input 
			onChange={this.handleChange} 
			name="isGoing" 
			type="checkbox" 
			checked={this.state.isGoing}/>
			<input 
			onChange={this.handleChange} 
			name="numberOfGuests" 
			type="number" 
			value={this.state.numberOfGuests}/>
		</form>;
	}
}
*/
/*
var BoilingVerdict = (props)=> (
	props.celsius>=100 ?<h1>The water would boil.</h1>: <h1>The water would not boil.</h1>
);

class Calculator extends React.Component{
	constructor(props){
		super(props);
		this.state={
			c:'',
			f:''
		};
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(event){
		const target = event.target;
		const name = target.name; 
		// console.log(target.value,isNaN(Number(target.value)));

		const values = ()=>{
			let c = target.value,
				f = c;

			if(name === 'c'){
				if(isNaN(parseFloat(c))){
					c = c;
					f='';
				} else{
					f = isNaN(Number(target.value))
					?''
					:(Math.round(c*1.8+32)*1000)/1000;
				}
			} else{
				if(isNaN(parseFloat(f))){
					f = f;
					c='';
				}else{
					c=isNaN(Number(target.value))
					?''
					:(Math.round( (f-32)/1.8)*1000)/1000;
				}
			}

			return {c:c.toString(),f:f.toString()};
		};

		this.setState(values());
		// console.log(this.state);
	}

	render(){
		return (<fieldset>
			<legend>Enter temperature in Celsius:</legend>
			Celsius:<input 
			name="c"
			value={this.state.c}
			onChange={this.handleChange}
			/>
			<br/>
			Fahrenheit:<input 
			name="f"
			value={this.state.f}
			onChange={this.handleChange}
			/>
			<BoilingVerdict celsius={parseFloat(this.state.c)}/>
		</fieldset>);
	}
}*/
/*
var FancyBorder = (props)=>(
	<div className={'border-'+props.color}>
		{props.children}
	</div>
)
var WelcomeDialog = ()=>(
	<FancyBorder color="blue">
	<h1 className="Dialog-title">
        Welcome
    </h1>
    <p className="Dialog-message">
        Thank you for visiting our spacecraft!
    </p>
	</FancyBorder>
)*/
/*
var FancyBorder = (props) => (
	<div className="fanciboyder">
		{props.children}
	</div>
)
var Dialog = (props)=>(
	<FancyBorder>
		{props.children}
	</FancyBorder>
)
class App extends React.Component{
	constructor(props){
		super(props)
		this.state={
			value:''
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleClick = this.handleClick.bind(this)
	}
	handleChange(event){
		const value = event.target.value
		this.setState({
			value
		})
	}
	handleClick(){
		alert(`this.state.value ${this.state.value}`)
	}
	render(){
		return <Dialog title="Mars Exploration Program"
	            message="How should we refer to you?">
	        haow to refer you : <input type="text" onChange={this.handleChange}/>
	        <button onClick={this.handleClick}>Sign me up!</button>
	    </Dialog>
	}
}
*/

class ProductFilter extends React.Component {
	constructor(props){
		super(props)
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(){
		this.props.handleUserInput(
			this.filterTextInput.value,
			this.isStockOnlyInput.checked
		)
	}

	render(){
		const style={border:'1px solid darkorchid',marginBottom:'10px'};
		return <div style={style}>
			<label htmlFor="">
				<input 
					type="checkbox" 
					checked={this.props.isShowStockedOnly} 
					onChange={this.handleChange} 
					ref={(input)=>this.isStockOnlyInput = input}
				/>
				show in the stock only
			</label>
			<br/>
			<label htmlFor="">
				input filter:<input 
				type="text" 
				value={this.props.filterText}
				onChange={this.handleChange} 
				ref={(input)=>this.filterTextInput = input}
				/>
			</label>
		</div>
	}
};


var ProductList = (props) => {
	let lastCategory = "";

	var result =[];
	props.products.map((key,index)=>{

		if(key.name.toLowerCase().indexOf(props.filterText.toLowerCase()) === -1 
			|| (props.isShowStockedOnly && !key.stocked)){
			return ;  
		}

		if(key.category!==lastCategory){
			result.push(
			 	<tr key={key.category}>
			 		<th colSpan="2">{key.category}</th>
			 	</tr>
		 	);
			lastCategory = key.category;
		} 

		result.push(			
			<tr key={key.name}>
				<td>{key.name}</td>
				<td>{key.price}</td>
			</tr>
		);
		
	});
	
	const style={width:'100%',border:'1px solid blue',textAlign:'center'};
	return <table style={style}>
		<thead>
			<tr>
				<th>Name</th>
				<th>Price</th>
			</tr>
		</thead>
		<tbody>{result}</tbody>
	</table>;
};

class Product extends React.Component{
	constructor(props){
		super(props);
		this.state={
			filterText:'',
			isShowStockedOnly:false
		}
		this.handleUserInput = this.handleUserInput.bind(this);
	}
	handleUserInput(filterText,isShowStockedOnly){
		this.setState({
			filterText,
			isShowStockedOnly
		})
	}
	render(){
		const style={width:'300px',border:'1px solid red',padding:'15px'};
		return (<div style={style}>
			product list
			<ProductFilter 
			handleUserInput={this.handleUserInput} 
			filterText={this.state.filterText}
			isShowStockedOnly = {this.state.isShowStockedOnly}
			/>
			<ProductList 
			products={this.props.products} 
			filterText={this.state.filterText}
			isShowStockedOnly = {this.state.isShowStockedOnly}
			/>
		</div>);
	}
}

var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(
	<Product products={PRODUCTS}/>,
	document.getElementById('root')
);

// ~!!!!!!!!!!!!!!!!!!!!Promise