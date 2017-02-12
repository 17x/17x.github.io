// input
class NameForm extends React.Component{
	constructor(props){
		super(props)
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.state={value:''}
	}
	handleChange(event){
		this.setState({value: event.target.value.toUpperCase()});
	}
	handleSubmit(event){
		console.log(this.state.value)
		event.preventDefault();
	}
	render(){
 		return (
 			<div>
 				<h1>hello world</h1>
 				<form onSubmit={this.handleSubmit}>
					<lable>
						Name:
						<input type="text" value={this.state.value} onChange={this.handleChange}/>
					</lable>
					<input type="submit" value="submit" />
 				</form>
 			</div>
 			)
	}
}
// textarea
class EssayForm extends React.Component{
	constructor(porps){
		super(porps)
		this.state={
			 value: 'Please write an essay about your favorite DOM element.'
		};

		this.handleSubmit=this.handleSubmit.bind(this);
		this.handleChange=this.handleChange.bind(this);
	}

	handleChange(event){
		this.setState({
			value:event.target.value
		})
	}
	handleSubmit(event){
		event.preventDefault()
	}

	render(){
		return <div>
				<h1>hello world</h1>
				<form onSubmit={this.handleSubmit}>
					<lable>
						Name:
						<textarea type="text" value={this.state.value} onChange={this.handleChange}>
							
						</textarea>

					</lable>
					<input type="submit" value="submit" />
				</form>
			</div>
	}
}

// select
class FlavorForm extends React.Component{
	constructor(props){
		super(props)
		this.state={value:'coconut'}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	handleSubmit(event){
		console.log(this.state.value)
		event.preventDefault();
	}
	handleChange(event){
		this.setState({
			value:event.target.value
		})
	}
	render(){
		return <div><h1>hello world</h1>
			<form onSubmit={this.handleSubmit}>
				<select name="" id="" value={this.state.value} onChange={this.handleChange}>
					<option>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum, in?</option>
					<option>Fugiat sunt optio iure cum, voluptates ipsum nihil quaerat ab.</option>
					<option>Eius pariatur voluptatibus, incidunt. Alias esse atque, distinctio pariatur expedita.</option>
					<option>Aliquam in enim dolorum accusamus quasi iure quo omnis harum.</option>
				</select>
				<input type="submit" value="submit" />
			</form>
		</div>
	}
}

ReactDOM.render(
  <FlavorForm />,
  document.getElementById('root')
);