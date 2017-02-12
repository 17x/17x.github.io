class Greeting extends React.Component{
	render(){
		return (
			<h1>hello , { this.props.name}</h1>
			)
	}
}

Greeting.propTypes = {
  name: React.PropTypes.string
};

ReactDOM.render(
 <Greeting name={true}/>,
  document.getElementById('root')
);
