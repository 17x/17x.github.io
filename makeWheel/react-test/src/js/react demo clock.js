class Clock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            age: Number(props.age)
        }
    }
    componentDidMount(){
    	this.timerId = setInterval(()=>this.grow(),1000)
    }

    componentWillUnMount(){
    	clearInterval(this.timerId)
    }

    grow(){
    	if(this.state.age >=20){
    		clearInterval(this.timerId)
    		this.setState({
    			age:'adult'
    		});
    		return false
    	}
    	this.setState((prevState, props) =>({
    		age: prevState.age + 1
    	}))
    }

    render(){
    	return (
    			<div>
    				<h1>hello</h1>
    				<h2>Im {this.state.age} year old</h2>
    			</div>
    		)
    }

}
function App(){
	return (
	<div>
		<Clock age='7'/>,<Clock age='9'/>,<Clock age='2'/>
	</div>		
	)
}
ReactDOM.render(
	<App />,
	document.getElementById('root')
)