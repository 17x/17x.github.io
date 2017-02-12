class Toggle extends React.Component {
    constructor(props) {
        super(props)
        this.state = { isToggleOn: true }
        // this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
    	console.log(this)
    	this.setState(prevState=>({
    			isToggleOn : !prevState.isToggleOn
    		})
    	);
    }
    render (){
        return ( 
        	< div >
	            < button onClick = { (e)=>this.handleClick(e) } >
	            	{ this.state.isToggleOn ? 'ON' : 'OFF' } 
	            < /button> 
            < /div>	
        )
    }
}

ReactDOM.render(
	<Toggle />,
	document.getElementById('root')
	)