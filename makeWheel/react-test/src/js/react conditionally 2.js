function ShowWarning(props){
	if(!props.showWarning){
		return null
	}
	return <p className="warning">Warning!</p>
}

class Page extends React.Component{
	constructor(props){
		super(props)
		this.state={showWarning :true }
		this.handleButtonClick = this.handleButtonClick.bind(this)
	}

	handleButtonClick(){
		this.setState((prevState)=>({
			showWarning: !prevState.showWarning
		}));
	}

	render(){
		return (
			<div>
				<h1>hello</h1>
				<ShowWarning showWarning={this.state.showWarning}/>
				<button onClick={this.handleButtonClick}>
					{this.state.showWarning?'hide':'show'}
				</button>
			</div>
		)
	}
}

ReactDOM.render(
	<Page />
	,document.getElementById('root')
)