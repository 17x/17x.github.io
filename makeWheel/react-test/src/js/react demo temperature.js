
class TemperatureInput extends React.Component{
	constructor(props){
		super(props)
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange (e){
		this.props.onChange(e.target.value)
	}
	render(){
		return (
			<fieldset>
				<legend>{this.props.legend}</legend>
				<input onChange={this.handleChange} type="text" value={this.props.value} />
				<br />
			</fieldset>
		)
	}
}
class Temperature extends React.Component{
	constructor(props){
		super(props)
		this.state={value:'',whichInput:'c'}
		this.handleFahrenheit = this.handleFahrenheit.bind(this)
		this.handleCelsius = this.handleCelsius.bind(this)
	}
	handleCelsius(e){
		this.setState({
			whichInput:'c',
			value
		})
	}
	handleFahrenheit(e){
		this.setState({
			whichInput:'f',
			value
		})
	}

	render(){
		console.clear()
		console.log(this.state.whichInput,this.state.value)
		let celsius,
			fahrenheit;
		if(this.state.value.trim() === '' || isNaN( Number(this.state.value))){
			celsius = this.state.whichInput === 'c'?this.state.value : ''
			fahrenheit = this.state.whichInput === 'f'?this.state.value : ''
		}
		if(!isNaN( Number(this.state.value)) && this.state.value !== ''){
			celsius = this.state.whichInput === 'c'?this.state.value:
						Math.round(((this.state.value-32)/1.8)*100)/100

			fahrenheit = this.state.whichInput === 'f'?this.state.value:
						(Math.round(((this.state.value*1.8)+32)*100))/100
		}
		console.log(celsius,fahrenheit)
	
		return (<div>			
				<h1>a temperature</h1>
				<p>{this.state.whichInput},{this.state.value}</p>
				
				<TemperatureInput 
				legend='celsius'
				onChange={this.handleCelsius}
				value={
					celsius					
				}
				 />
				 <TemperatureInput 
				legend='fahrenheit'
				onChange={this.handleFahrenheit}
				value={
					fahrenheit
				}
				 />
		</div>
		)
	}
}

ReactDOM.render(
	<div>
		<h1>hello world</h1>
		<Temperature />
	</div>,
	document.getElementById('root')
)