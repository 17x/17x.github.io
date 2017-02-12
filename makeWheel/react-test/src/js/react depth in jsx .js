

function Cmp1(props) {
  return(
  	<div>Cmp1: return a number: {props.foo} <hr/></div>
	)
}

function Cmp2(props) {
	let aList=[];
	props.numbers.forEach((number)=>{
		let description;
		  if (number % 2 == 0) {
		    description = <strong>even {number}</strong>;
		  } else {
		    description = <i>odd {number}</i>;
		  }
		  aList.push(description)
		  aList.push(<br />)
	})
  return (<div>Cmp2: {aList} <hr/></div>)
}

function Cmp3(props) {
  return (<div>Cmp3: {props.message} <hr/></div>)
}
function Cmp4(props) {
  return (<div>Cmp4: {props.message}|{props.message2} <hr/></div>)
}

function Cmp5(props) {
  return (<div>Cmp5: {props.autocomplete.toString()}|{props.autocomplete2.toString()} <hr/></div>)
}

function Cmp5(props) {
  return (<div>Cmp5: {props.autocomplete.toString()}|{props.autocomplete2.toString()} <hr/></div>)
}
function Cmp6(props) {
  return (<div>Cmp6: {props.firstName}.{props.lastName} <hr/></div>)
}
function Cmp7(props) {
  return (<div>Cmp7: Hi {props.name + ' .' + props.children}!</div>)
}
function Cmp8() {
  return (<div>
  	Cmp8: 
  		these render to same thing: <div>Hello World</div>
			<div>
			  Hello World
			</div>
			<div>
			  Hello
			  World
			</div>
			<div>
			  Hello World
			</div>
			<hr/>
		</div>)
}

function Cmp9(props) {
  return (<div>Cmp9: {props.children} <hr/></div>)
}

function Cmp9_1() {
  return (<div>Cmp9_1</div>)
}
function Cmp9_2() {
  return (<div>Cmp9_2</div>)
}
function Item(props){
	return <li>{props.message}</li>
}

function TotoList(){
 	const todos = ['finish doc', 'submit pr', 'nag dan to review'];
 	return(
 		<ul> 
 			<b>TotoList:</b>
	 		{todos.map((message)=>
	 			(<Item key={message} message={message}/>)
	 		)}
	 		<hr/>
 		</ul>

	)
}
function ListOfTenThings(props){
	return (
		<Repeat nums={10}>
			{ (index)=> <li key={index}> 现在是第 {index} 个数字</li> }
		</Repeat>
	)
}

function Repeat(props){
	let items=[];
	for (var i = 0; i < props.nums; i++) {
		items.push(props.children(i))
	}
	return <ul><b>ListOfTenThings:</b>{items} <hr/></ul>
}

function Ignored(){
	return (
		<div>
			<p>Ignored: </p>
			<div />

			<div></div>

			<div>{false}</div>

			<div>{null}</div>

			<div>{true}</div>
			<hr/>
		</div>
	)
}
function C_header(){
	return (
		<div>here is header</div>
	)
}

function ConditionallyRender(){
	const showHeader = true
	return (
		<div>
			<p>showHeader:</p>
			<p>showHeader is {showHeader.toString()}</p>
			{showHeader && <C_header />}
			<hr/>
		</div>
	)
}
function FalsyValue(){
	let messages = [];
	return (
		<div>
			<p>will show 0</p>
			{
				messages.length && <C_falsyValue messages={messages}/>
			}
			<p>this will show nothing</p>
			{
				messages.length>0 && <C_falsyValue messages={messages}/>
			}
			<hr/>
		</div>
		)
}
function C_falsyValue(){
	return (
		<div>messages.length :{props.messages} </div>
		)
}

function ShowSpecialType(){
	return (
		<div>
			<p>false: {String(false)}</p>
			<p>true: {String(true)}</p>
			<p>null: {String(null)}</p>
			<p>undefined: {String(undefined)}</p>
			<hr/>
		</div>
		)
}

function App(){
	const props = {firstName: 'Ben', lastName: 'Hector'};
	return (<div>		
 		<Cmp1 foo={1+2+3+4}/>
 		<Cmp2 numbers={[0,1,2,3,4,5,6,7]}/>
 		<Cmp3 message={'hello'}/>
 		<Cmp4 message={'<3'} message2={'&lt;3'}/>
 		<Cmp5 autocomplete autocomplete2={true}/>
 		<Cmp6 {...props}/>
		<Cmp7 name={'linda'}>nice to meet you</Cmp7>
		<Cmp8 />
		<Cmp9>
			<Cmp9_1 />
			<Cmp9_2 />
		</Cmp9>
		<TotoList />
		<ListOfTenThings />
		<Ignored />
		<ConditionallyRender />
		<FalsyValue />
		<ShowSpecialType />

	</div>
	)
}
ReactDOM.render(
 <App />,
  document.getElementById('root')
);