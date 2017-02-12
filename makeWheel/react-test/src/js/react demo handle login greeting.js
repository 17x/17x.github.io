
function UserGreenting(){
	return <div>Welcome to back</div>
} 

function GuestGreenting(){
	return <div>please login</div>	
}

function Greeting(porps){
	if(porps.isLogin){
		return UserGreenting()
	}
	return GuestGreenting()
}

class LoginControl extends React.Component {
    constructor(props) {
        super(props)
        this.state = { isLogin: false }
        this.handleLoginClick = this.handleLoginClick.bind(this)
        this.handleLogoutClick = this.handleLogoutClick.bind(this)
    }

    handleLoginClick() {
        this.setState({
        	isLogin:true
        })
    }
    handleLogoutClick() {
        this.setState((prev)=>({
        	isLogin:!prev.isLogin
        }))
    }

    render() {        
        let button = this.state.isLogin ? <button onClick={this.handleLogoutClick}>logout</button>
        :<button onClick={this.handleLoginClick}>login</button>
        
        return ( 
        	< div >
        		<Greeting isLogin={this.state.isLogin}/>
            	{button} 
            < /div>
        )
    }

}

ReactDOM.render( < LoginControl / > ,
    document.getElementById('root')
)
