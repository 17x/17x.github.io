

const messages = ['React', 'Re: React', 'Re:Re: React'];

function MessageBox(props){
	// if(props.unreadMessages)
	return (
		<div><h1>hello</h1>
		{
			props.unreadMessages.length>0 &&
			(<div> you have {props.unreadMessages.length} unreadMessages</div>)
		}		
		<div> the user is <b>{props.isLoggedIn?'currently':'not'}</b> Logged In</div>
		
	</div>
	)
}

ReactDOM.render(
	<MessageBox unreadMessages={messages} isLoggedIn={true} />
	,document.getElementById('root')
	)