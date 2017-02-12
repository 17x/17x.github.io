function FuncyBorder(props) {
	return <div className={'FancyBorder FancyBorder-'+props.color}>
		{props.children}
	</div>
}

function Dialog(props){
	return (
		<FuncyBorder>
			<h1 className="Dialog-title">
        		{props.title}
	      	</h1>
	      	<p className="Dialog-message">
	       		{props.message}
	      	</p>
	      	{props.children}
		</FuncyBorder>
	)
}


class SignUpDialog extends React.Component {
    constructor(props) {
     super(props) 
     this.state={value:''}
     this.handleChange = this.handleChange.bind(this)
	 this.handleClick = this.handleClick.bind(this)
    }
    handleChange(e){
    	this.setState({
    		value:e.target.value
    	})
    }
    handleClick(){
    	alert(`Welcome aboard, ${this.state.login}!`);
    }
    render(){
    	return <Dialog title="bigTitle" message="no message here!!">
    		<input type="text" value={this.state.value} onChange={this.handleChange}/>
    		<input type="button" value="sayHi" onClick={this.handleClick}/>
    	</Dialog>
    }
}
ReactDOM.render( < SignUpDialog / > , document.getElementById('root'))
